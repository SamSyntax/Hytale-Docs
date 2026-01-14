---
id: network-protocol
title: Network Protocol
sidebar_label: Network Protocol
sidebar_position: 5
description: Understanding the Hytale server network protocol
---

# Network Protocol

This document describes the Hytale network protocol used for communication between clients and servers. The information is derived from analysis of the decompiled server code.

## Protocol Overview

Hytale uses a modern, efficient network protocol built on top of QUIC (Quick UDP Internet Connections).

| Property | Value |
|----------|-------|
| Transport | QUIC over UDP |
| Default Port | 5520 |
| Application Protocol | `hytale/1` |

QUIC provides several advantages over traditional TCP:
- **Reduced latency**: Faster connection establishment with 0-RTT support
- **Multiplexed streams**: Multiple data streams without head-of-line blocking
- **Built-in encryption**: TLS 1.3 integrated into the protocol
- **Connection migration**: Handles network changes gracefully

## Protocol Constants

The protocol uses the following constants defined in `ProtocolSettings.java`:

| Constant | Value | Description |
|----------|-------|-------------|
| `PROTOCOL_HASH` | `6708f121966c1c443f4b0eb525b2f81d0a8dc61f5003a692a8fa157e5e02cea9` | SHA-256 hash for version validation |
| `PROTOCOL_VERSION` | 1 | Protocol version number |
| `PACKET_COUNT` | 268 | Total number of packet types |
| `STRUCT_COUNT` | 315 | Total number of data structures |
| `ENUM_COUNT` | 136 | Total number of enumerations |
| `MAX_PACKET_SIZE` | 1,677,721,600 | Maximum packet size in bytes (~1.6 GB) |
| `DEFAULT_PORT` | 5520 | Default server port |

The `PROTOCOL_HASH` is used during the handshake to ensure client and server are using compatible protocol versions.

## Packet Interface

All packets implement the `Packet` interface (`com.hypixel.hytale.protocol.Packet`):

```java
public interface Packet {
   int getId();
   void serialize(@Nonnull ByteBuf var1);
   int computeSize();
}
```

| Method | Description |
|--------|-------------|
| `getId()` | Returns the unique packet identifier |
| `serialize(ByteBuf)` | Writes the packet data to a byte buffer |
| `computeSize()` | Calculates the serialized size of the packet |

## Serialization

### Frame Structure

Packets are transmitted as length-prefixed binary frames:

```
+----------------+----------------+------------------+
| Length (4 bytes) | Packet ID (4 bytes) | Payload (variable) |
+----------------+----------------+------------------+
```

| Component | Size | Description |
|-----------|------|-------------|
| Length Prefix | 4 bytes | Total frame length |
| Packet ID | 4 bytes | Identifies the packet type |
| Payload | Variable | Packet-specific data |
| **Minimum Frame Size** | 8 bytes | Length + Packet ID |

### Compression

Large packets use **Zstd** (Zstandard) compression for efficient bandwidth usage. Zstd provides:
- Fast compression and decompression speeds
- High compression ratios
- Streaming support

Packets that use compression have an `IS_COMPRESSED = true` flag in their class definition.

### Variable-Length Integers (VarInt)

Hytale implements its own VarInt encoding for variable-length integers in `com.hypixel.hytale.protocol.io.VarInt`:

```java
public static void write(@Nonnull ByteBuf buf, int value) {
   if (value < 0) {
      throw new IllegalArgumentException("VarInt cannot encode negative values: " + value);
   } else {
      while ((value & -128) != 0) {
         buf.writeByte(value & 127 | 128);
         value >>>= 7;
      }
      buf.writeByte(value);
   }
}
```

Key characteristics:
- Only encodes non-negative values
- Uses 7 bits per byte for data, 1 bit as continuation flag
- Smaller values use fewer bytes (efficient for common small numbers)

## Packet Directions

Packets flow in three directions:

| Direction | Description | Example |
|-----------|-------------|---------|
| **Client to Server** | Sent by clients, handled by server packet handlers | `ClientMovement`, `ChatMessage` |
| **Server to Client** | Sent by server, processed by client | `SetChunk`, `EntityUpdates` |
| **Bidirectional** | Can be sent by either party | `Disconnect`, `SetPaused` |

Client-to-server packets are registered in `GamePacketHandler.registerHandlers()`:

```java
this.registerHandler(108, p -> this.handle((ClientMovement)p));
this.registerHandler(211, p -> this.handle((ChatMessage)p));
```

Server-to-client packets are encoded via `PacketEncoder.encode()` and sent through the network channel.

## Connection Flow

### Handshake Process

1. **Client connects** via QUIC transport
2. **Client sends `Connect` packet** (ID 0) with:
   - Protocol hash for version validation
   - Client type (Game or Editor)
   - Language code
   - Identity token for authentication
   - Player UUID and username
3. **Server validates** the protocol hash against expected value
4. **Server validates** authentication credentials
5. **Server responds** with either:
   - `ConnectAccept` (ID 14) - Connection accepted, may include password challenge
   - `Disconnect` (ID 1) - Connection rejected with reason
6. **Authentication continues** via `AuthenticationPacketHandler`
7. **Setup phase** transitions to `SetupPacketHandler`
8. **Gameplay** transitions to `GamePacketHandler`

```
Client                                Server
   |                                    |
   |  -------- QUIC Connect ----------> |
   |                                    |
   |  -------- Connect (ID 0) --------> |
   |       protocolHash, clientType,    |
   |       language, identityToken,     |
   |       uuid, username               |
   |                                    |
   |  <----- ConnectAccept (ID 14) ---- |
   |       passwordChallenge (optional) |
   |                                    |
   |  -------- AuthToken (ID 12) -----> |
   |       accessToken,                 |
   |       serverAuthorizationGrant     |
   |                                    |
   |  <------ JoinWorld (ID 104) ------ |
   |                                    |
```

## Packet Categories

Packets are organized into functional categories:

### Connection Packets

Manage connection lifecycle.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `Connect` | 0 | Client -> Server | Initial connection request |
| `Disconnect` | 1 | Bidirectional | Connection termination |
| `Ping` | 2 | Server -> Client | Latency measurement request |
| `Pong` | 3 | Client -> Server | Latency measurement response |

### Authentication Packets

Handle authentication flow.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `Status` | 10 | Server -> Client | Server status information |
| `AuthToken` | 12 | Client -> Server | Authentication token submission |
| `ConnectAccept` | 14 | Server -> Client | Connection accepted response |

### Player Packets

Manage player state and actions.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `JoinWorld` | 104 | Server -> Client | Join a world |
| `ClientReady` | 105 | Client -> Server | Client ready state |
| `ClientMovement` | 108 | Client -> Server | Player movement update |
| `MouseInteraction` | 111 | Client -> Server | Mouse input events |
| `SyncPlayerPreferences` | 116 | Client -> Server | Sync player settings |
| `ClientPlaceBlock` | 117 | Client -> Server | Place block request |
| `RemoveMapMarker` | 119 | Client -> Server | Remove map marker |

### World Packets

Synchronize world data.

| Packet | ID | Direction | Compressed | Description |
|--------|-----|-----------|------------|-------------|
| `SetChunk` | 131 | Server -> Client | Yes | Chunk data transfer |
| `SetPaused` | 158 | Bidirectional | No | Pause game state |

### Entity Packets

Synchronize entity state.

| Packet | ID | Direction | Compressed | Description |
|--------|-----|-----------|------------|-------------|
| `EntityUpdates` | 161 | Server -> Client | Yes | Entity state updates |
| `MountMovement` | 166 | Client -> Server | No | Mounted entity movement |

### Inventory Packets

Manage player inventory.

| Packet | ID | Direction | Compressed | Description |
|--------|-----|-----------|------------|-------------|
| `UpdatePlayerInventory` | 170 | Server -> Client | Yes | Full inventory sync |

### Window/UI Packets

Handle UI interactions.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `CloseWindow` | 202 | Client -> Server | Close UI window |
| `SendWindowAction` | 203 | Client -> Server | Window interaction |
| `ClientOpenWindow` | 204 | Client -> Server | Request to open window |

### Interface Packets

Chat and interface management.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `ChatMessage` | 211 | Client -> Server | Send chat message |
| `CustomPageEvent` | 219 | Client -> Server | Custom page interaction |
| `UpdateLanguage` | 232 | Client -> Server | Change language setting |

### World Map Packets

World map interactions.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `UpdateWorldMapVisible` | 243 | Client -> Server | Toggle world map visibility |
| `TeleportToWorldMapMarker` | 244 | Client -> Server | Teleport to marker |
| `TeleportToWorldMapPosition` | 245 | Client -> Server | Teleport to position |

### Setup Packets

Initial client setup.

| Packet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `RequestAssets` | 23 | Client -> Server | Request asset data |
| `ViewRadius` | 32 | Client -> Server | Set view distance |

### Specialized Packets

| Category | Packets | Description |
|----------|---------|-------------|
| Server Access | `UpdateServerAccess` (251), `SetServerAccess` (252) | Singleplayer access control |
| Machinima | `RequestMachinimaActorModel` (260), `UpdateMachinimaScene` (262) | Cinematic tools |
| Camera | `RequestFlyCameraMode` (282) | Camera control |
| Interaction | `SyncInteractionChains` (290) | Interaction chains |
| Assets | 40+ packets | Asset synchronization |

## Key Packet Details

### Connect (ID 0)

Initial connection packet sent by clients.

| Field | Type | Description |
|-------|------|-------------|
| `protocolHash` | String | 64-character ASCII protocol hash |
| `clientType` | ClientType | Game or Editor |
| `language` | String | Language code (e.g., "en-US") |
| `identityToken` | String | Authentication identity token |
| `uuid` | UUID | Player UUID |
| `username` | String | Player username (max 16 chars) |
| `referralData` | byte[] | Optional referral data (max 4096 bytes) |
| `referralSource` | HostAddress | Optional referral source |

**Max Size**: 38,161 bytes

### Disconnect (ID 1)

Connection termination packet.

| Field | Type | Description |
|-------|------|-------------|
| `reason` | String | Disconnect reason message |
| `type` | DisconnectType | Disconnect, Crash, etc. |

**Max Size**: 16,384,007 bytes

### Ping/Pong (ID 2/3)

Latency measurement packets.

**Ping** (Server -> Client):

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Ping identifier |
| `time` | InstantData | Timestamp data |
| `lastPingValueRaw` | int | Last raw ping |
| `lastPingValueDirect` | int | Last direct ping |
| `lastPingValueTick` | int | Last tick ping |

**Pong** (Client -> Server):

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Matching ping identifier |
| `time` | InstantData | Timestamp data |
| `type` | PongType | Raw, Direct, or Tick |
| `packetQueueSize` | short | Client queue size |

### ClientMovement (ID 108)

Player movement state packet.

| Field | Type | Description |
|-------|------|-------------|
| `movementStates` | MovementStates | Movement flags |
| `relativePosition` | HalfFloatPosition | Position delta |
| `absolutePosition` | Position | Absolute coordinates |
| `bodyOrientation` | Direction | Body rotation |
| `lookOrientation` | Direction | Head/look direction |
| `teleportAck` | TeleportAck | Teleport acknowledgment |
| `wishMovement` | Position | Desired movement |
| `velocity` | Vector3d | Current velocity |
| `mountedTo` | int | Mounted entity ID |
| `riderMovementStates` | MovementStates | Riding movement states |

**Max Size**: 153 bytes

### SetChunk (ID 131)

Chunk data packet (compressed).

| Field | Type | Description |
|-------|------|-------------|
| `x` | int | Chunk X coordinate |
| `y` | int | Chunk Y coordinate |
| `z` | int | Chunk Z coordinate |
| `localLight` | byte[] | Local lighting data |
| `globalLight` | byte[] | Global lighting data |
| `data` | byte[] | Block data |

**Max Size**: 12,288,040 bytes
**Compression**: Zstd

### EntityUpdates (ID 161)

Entity synchronization packet (compressed).

| Field | Type | Description |
|-------|------|-------------|
| `removed` | int[] | Removed entity IDs |
| `updates` | EntityUpdate[] | Entity state updates |

**Max Size**: 1,677,721,600 bytes
**Compression**: Zstd

### UpdatePlayerInventory (ID 170)

Full inventory synchronization packet (compressed).

| Field | Type | Description |
|-------|------|-------------|
| `storage` | InventorySection | Storage section |
| `armor` | InventorySection | Armor section |
| `hotbar` | InventorySection | Hotbar section |
| `utility` | InventorySection | Utility items |
| `builderMaterial` | InventorySection | Builder materials |
| `tools` | InventorySection | Tools section |
| `backpack` | InventorySection | Backpack section |
| `sortType` | SortType | Current sort type |

**Compression**: Zstd

### ChatMessage (ID 211)

Chat message packet.

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Message content (max 4,096,000 chars) |

**Max Size**: 16,384,006 bytes

## Disconnect Types

The `DisconnectType` enum defines various disconnect reasons:

| Type | Description |
|------|-------------|
| `Disconnect` | Normal disconnect |
| `Crash` | Client/server crash |

## Source Files Reference

| Component | Source File |
|-----------|-------------|
| Transport | `com/hypixel/hytale/server/core/io/transport/QUICTransport.java` |
| Packet Base | `com/hypixel/hytale/protocol/Packet.java` |
| Protocol Constants | `com/hypixel/hytale/protocol/ProtocolSettings.java` |
| Packet IO | `com/hypixel/hytale/protocol/io/PacketIO.java` |
| VarInt | `com/hypixel/hytale/protocol/io/VarInt.java` |
| Packet Encoder | `com/hypixel/hytale/protocol/io/netty/PacketEncoder.java` |
| Initial Handler | `com/hypixel/hytale/server/core/io/handlers/InitialPacketHandler.java` |
| Game Handler | `com/hypixel/hytale/server/core/io/handlers/game/GamePacketHandler.java` |
