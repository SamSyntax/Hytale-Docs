---
id: player-chat-event
title: PlayerChatEvent
sidebar_label: PlayerChatEvent
---

# PlayerChatEvent

Fired when a player sends a chat message. This is an asynchronous, cancellable event that allows plugins to modify, filter, or block chat messages before they are delivered to recipients.

## Event Information

| Property | Value |
|----------|-------|
| **Full Class Name** | `com.hypixel.hytale.server.core.event.events.player.PlayerChatEvent` |
| **Parent Class** | `IAsyncEvent<String>` |
| **Cancellable** | Yes |
| **Async** | Yes |
| **Source File** | `decompiled/com/hypixel/hytale/server/core/event/events/player/PlayerChatEvent.java:10` |

## Declaration

```java
public class PlayerChatEvent implements IAsyncEvent<String>, ICancellable {
   @Nonnull
   public static final PlayerChatEvent.Formatter DEFAULT_FORMATTER = ...
```

## Fields

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `sender` | `PlayerRef` | `getSender()` | Reference to the player who sent the message |
| `targets` | `List<PlayerRef>` | `getTargets()` | List of players who will receive the message |
| `content` | `String` | `getContent()` | The chat message content |
| `formatter` | `PlayerChatEvent.Formatter` | `getFormatter()` | The formatter used to format the message |
| `cancelled` | `boolean` | `isCancelled()` | Whether the chat event has been cancelled |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getSender` | `@Nonnull public PlayerRef getSender()` | Returns the player who sent the message |
| `setSender` | `public void setSender(@Nonnull PlayerRef sender)` | Changes the sender of the message |
| `getTargets` | `@Nonnull public List<PlayerRef> getTargets()` | Returns the list of message recipients |
| `setTargets` | `public void setTargets(@Nonnull List<PlayerRef> targets)` | Sets the list of message recipients |
| `getContent` | `@Nonnull public String getContent()` | Returns the chat message content |
| `setContent` | `public void setContent(@Nonnull String content)` | Modifies the chat message content |
| `getFormatter` | `@Nonnull public PlayerChatEvent.Formatter getFormatter()` | Returns the message formatter |
| `setFormatter` | `public void setFormatter(@Nonnull PlayerChatEvent.Formatter formatter)` | Sets a custom message formatter |
| `isCancelled` | `public boolean isCancelled()` | Returns whether the event is cancelled |
| `setCancelled` | `public void setCancelled(boolean cancelled)` | Cancels or uncancels the event |
| `toString` | `@Nonnull public String toString()` | Returns a string representation of this event |

## Inner Classes

| Class | Type | Description |
|-------|------|-------------|
| `Formatter` | `interface` | Interface for formatting chat messages. The `format(PlayerRef sender, String content)` method returns a `Message` object. |

## Usage Example

> **Tested** - This code has been verified with a working plugin.

Since `PlayerChatEvent` implements `IAsyncEvent<String>` (non-Void key type), you must use `registerGlobal()` to catch all chat events regardless of their key.

```java
// Register a global handler for chat events (required for non-Void key types)
eventBus.registerGlobal(PlayerChatEvent.class, event -> {
    String playerName = event.getSender() != null ? event.getSender().getUsername() : "Unknown";
    String message = event.getContent();

    // Log the chat message
    logger.info("[Chat] " + playerName + ": " + message);

    // Filter profanity
    if (containsProfanity(message)) {
        event.setCancelled(true);
        return;
    }

    // Modify the message content
    event.setContent(message.toUpperCase()); // Example: make all caps
});

// Custom formatter example
eventBus.registerGlobal(PlayerChatEvent.class, event -> {
    event.setFormatter((sender, content) -> {
        return Message.translation("chat.format")
            .param("sender", sender.getUsername())
            .param("message", content);
    });
});
```

**Important:** Using `register()` instead of `registerGlobal()` will not work for this event because it has a `String` key type.

## Common Use Cases

- Chat filtering and profanity detection
- Custom chat formatting (prefixes, colors, etc.)
- Private messaging systems
- Chat channels or rooms
- Spam prevention and rate limiting
- Chat logging and moderation
- Translation or localization of messages

## Related Events

- [PlayerConnectEvent](./player-connect-event.md) - Fired when a player connects
- [PlayerDisconnectEvent](./player-disconnect-event.md) - Fired when a player disconnects

## Notes

This event is **asynchronous**, which means handlers should return a `CompletableFuture`. This allows for non-blocking operations like database lookups or external API calls during chat processing.

The `DEFAULT_FORMATTER` static field provides the default formatting behavior if no custom formatter is set.

## Source Reference

`decompiled/com/hypixel/hytale/server/core/event/events/player/PlayerChatEvent.java:10`
