---
id: network-protocol
title: Protocole Réseau
sidebar_label: Protocole Réseau
sidebar_position: 5
description: Comprendre le protocole réseau du serveur Hytale
---

# Protocole Réseau

Ce document décrit le protocole réseau Hytale utilisé pour la communication entre les clients et les serveurs. Les informations sont dérivées de l'analyse du code serveur décompilé.

## Aperçu du Protocole

Hytale utilise un protocole réseau moderne et efficace construit sur QUIC (Quick UDP Internet Connections).

| Propriété | Valeur |
|-----------|--------|
| Transport | QUIC sur UDP |
| Port par défaut | 5520 |
| Protocole applicatif | `hytale/1` |

QUIC offre plusieurs avantages par rapport au TCP traditionnel :
- **Latence réduite** : Établissement de connexion plus rapide avec prise en charge du 0-RTT
- **Flux multiplexés** : Plusieurs flux de données sans blocage en tête de ligne
- **Chiffrement intégré** : TLS 1.3 intégré au protocole
- **Migration de connexion** : Gère les changements de réseau de manière élégante

## Constantes du Protocole

Le protocole utilise les constantes suivantes définies dans `ProtocolSettings.java` :

| Constante | Valeur | Description |
|-----------|--------|-------------|
| `PROTOCOL_HASH` | `6708f121966c1c443f4b0eb525b2f81d0a8dc61f5003a692a8fa157e5e02cea9` | Hachage SHA-256 pour la validation de version |
| `PROTOCOL_VERSION` | 1 | Numéro de version du protocole |
| `PACKET_COUNT` | 268 | Nombre total de types de paquets |
| `STRUCT_COUNT` | 315 | Nombre total de structures de données |
| `ENUM_COUNT` | 136 | Nombre total d'énumérations |
| `MAX_PACKET_SIZE` | 1 677 721 600 | Taille maximale d'un paquet en octets (~1,6 Go) |
| `DEFAULT_PORT` | 5520 | Port serveur par défaut |

Le `PROTOCOL_HASH` est utilisé lors de la poignée de main pour s'assurer que le client et le serveur utilisent des versions de protocole compatibles.

## Interface Packet

Tous les paquets implémentent l'interface `Packet` (`com.hypixel.hytale.protocol.Packet`) :

```java
public interface Packet {
   int getId();
   void serialize(@Nonnull ByteBuf var1);
   int computeSize();
}
```

| Méthode | Description |
|---------|-------------|
| `getId()` | Retourne l'identifiant unique du paquet |
| `serialize(ByteBuf)` | Écrit les données du paquet dans un tampon d'octets |
| `computeSize()` | Calcule la taille sérialisée du paquet |

## Sérialisation

### Structure des Trames

Les paquets sont transmis sous forme de trames binaires préfixées par leur longueur :

```
+--------------------+------------------------+-------------------------+
| Longueur (4 octets) | ID du paquet (4 octets) | Charge utile (variable) |
+--------------------+------------------------+-------------------------+
```

| Composant | Taille | Description |
|-----------|--------|-------------|
| Préfixe de longueur | 4 octets | Longueur totale de la trame |
| ID du paquet | 4 octets | Identifie le type de paquet |
| Charge utile | Variable | Données spécifiques au paquet |
| **Taille minimale de trame** | 8 octets | Longueur + ID du paquet |

### Compression

Les paquets volumineux utilisent la compression **Zstd** (Zstandard) pour une utilisation efficace de la bande passante. Zstd offre :
- Des vitesses de compression et de décompression rapides
- Des taux de compression élevés
- Une prise en charge du streaming

Les paquets utilisant la compression ont un indicateur `IS_COMPRESSED = true` dans leur définition de classe.

### Entiers à Longueur Variable (VarInt)

Hytale implémente son propre encodage VarInt pour les entiers à longueur variable dans `com.hypixel.hytale.protocol.io.VarInt` :

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

Caractéristiques principales :
- N'encode que les valeurs non négatives
- Utilise 7 bits par octet pour les données, 1 bit comme indicateur de continuation
- Les valeurs plus petites utilisent moins d'octets (efficace pour les petits nombres courants)

## Directions des Paquets

Les paquets circulent dans trois directions :

| Direction | Description | Exemple |
|-----------|-------------|---------|
| **Client vers Serveur** | Envoyés par les clients, traités par les gestionnaires de paquets du serveur | `ClientMovement`, `ChatMessage` |
| **Serveur vers Client** | Envoyés par le serveur, traités par le client | `SetChunk`, `EntityUpdates` |
| **Bidirectionnel** | Peuvent être envoyés par l'une ou l'autre partie | `Disconnect`, `SetPaused` |

Les paquets client vers serveur sont enregistrés dans `GamePacketHandler.registerHandlers()` :

```java
this.registerHandler(108, p -> this.handle((ClientMovement)p));
this.registerHandler(211, p -> this.handle((ChatMessage)p));
```

Les paquets serveur vers client sont encodés via `PacketEncoder.encode()` et envoyés à travers le canal réseau.

## Flux de Connexion

### Processus de Poignée de Main

1. **Le client se connecte** via le transport QUIC
2. **Le client envoie un paquet `Connect`** (ID 0) avec :
   - Le hachage du protocole pour la validation de version
   - Le type de client (Game ou Editor)
   - Le code de langue
   - Le jeton d'identité pour l'authentification
   - L'UUID et le nom d'utilisateur du joueur
3. **Le serveur valide** le hachage du protocole par rapport à la valeur attendue
4. **Le serveur valide** les identifiants d'authentification
5. **Le serveur répond** avec soit :
   - `ConnectAccept` (ID 14) - Connexion acceptée, peut inclure un défi de mot de passe
   - `Disconnect` (ID 1) - Connexion refusée avec raison
6. **L'authentification continue** via `AuthenticationPacketHandler`
7. **La phase de configuration** passe à `SetupPacketHandler`
8. **Le jeu** passe à `GamePacketHandler`

```
Client                                Serveur
   |                                    |
   |  -------- Connexion QUIC --------> |
   |                                    |
   |  -------- Connect (ID 0) --------> |
   |       protocolHash, clientType,    |
   |       language, identityToken,     |
   |       uuid, username               |
   |                                    |
   |  <----- ConnectAccept (ID 14) ---- |
   |       passwordChallenge (optionnel)|
   |                                    |
   |  -------- AuthToken (ID 12) -----> |
   |       accessToken,                 |
   |       serverAuthorizationGrant     |
   |                                    |
   |  <------ JoinWorld (ID 104) ------ |
   |                                    |
```

## Catégories de Paquets

Les paquets sont organisés en catégories fonctionnelles :

### Paquets de Connexion

Gèrent le cycle de vie de la connexion.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `Connect` | 0 | Client -> Serveur | Requête de connexion initiale |
| `Disconnect` | 1 | Bidirectionnel | Terminaison de connexion |
| `Ping` | 2 | Serveur -> Client | Requête de mesure de latence |
| `Pong` | 3 | Client -> Serveur | Réponse de mesure de latence |

### Paquets d'Authentification

Gèrent le flux d'authentification.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `Status` | 10 | Serveur -> Client | Informations sur le statut du serveur |
| `AuthToken` | 12 | Client -> Serveur | Soumission du jeton d'authentification |
| `ConnectAccept` | 14 | Serveur -> Client | Réponse de connexion acceptée |

### Paquets Joueur

Gèrent l'état et les actions du joueur.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `JoinWorld` | 104 | Serveur -> Client | Rejoindre un monde |
| `ClientReady` | 105 | Client -> Serveur | État prêt du client |
| `ClientMovement` | 108 | Client -> Serveur | Mise à jour du mouvement du joueur |
| `MouseInteraction` | 111 | Client -> Serveur | Événements d'entrée souris |
| `SyncPlayerPreferences` | 116 | Client -> Serveur | Synchroniser les paramètres du joueur |
| `ClientPlaceBlock` | 117 | Client -> Serveur | Requête de placement de bloc |
| `RemoveMapMarker` | 119 | Client -> Serveur | Supprimer un marqueur de carte |

### Paquets de Monde

Synchronisent les données du monde.

| Paquet | ID | Direction | Compressé | Description |
|--------|-----|-----------|-----------|-------------|
| `SetChunk` | 131 | Serveur -> Client | Oui | Transfert de données de chunk |
| `SetPaused` | 158 | Bidirectionnel | Non | Mettre en pause l'état du jeu |

### Paquets d'Entité

Synchronisent l'état des entités.

| Paquet | ID | Direction | Compressé | Description |
|--------|-----|-----------|-----------|-------------|
| `EntityUpdates` | 161 | Serveur -> Client | Oui | Mises à jour de l'état des entités |
| `MountMovement` | 166 | Client -> Serveur | Non | Mouvement d'entité montée |

### Paquets d'Inventaire

Gèrent l'inventaire du joueur.

| Paquet | ID | Direction | Compressé | Description |
|--------|-----|-----------|-----------|-------------|
| `UpdatePlayerInventory` | 170 | Serveur -> Client | Oui | Synchronisation complète de l'inventaire |

### Paquets de Fenêtre/Interface

Gèrent les interactions d'interface utilisateur.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `CloseWindow` | 202 | Client -> Serveur | Fermer une fenêtre d'interface |
| `SendWindowAction` | 203 | Client -> Serveur | Interaction avec une fenêtre |
| `ClientOpenWindow` | 204 | Client -> Serveur | Requête d'ouverture de fenêtre |

### Paquets d'Interface

Gestion du chat et de l'interface.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `ChatMessage` | 211 | Client -> Serveur | Envoyer un message de chat |
| `CustomPageEvent` | 219 | Client -> Serveur | Interaction avec une page personnalisée |
| `UpdateLanguage` | 232 | Client -> Serveur | Changer le paramètre de langue |

### Paquets de Carte du Monde

Interactions avec la carte du monde.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `UpdateWorldMapVisible` | 243 | Client -> Serveur | Basculer la visibilité de la carte |
| `TeleportToWorldMapMarker` | 244 | Client -> Serveur | Se téléporter à un marqueur |
| `TeleportToWorldMapPosition` | 245 | Client -> Serveur | Se téléporter à une position |

### Paquets de Configuration

Configuration initiale du client.

| Paquet | ID | Direction | Description |
|--------|-----|-----------|-------------|
| `RequestAssets` | 23 | Client -> Serveur | Demander les données d'assets |
| `ViewRadius` | 32 | Client -> Serveur | Définir la distance de vue |

### Paquets Spécialisés

| Catégorie | Paquets | Description |
|-----------|---------|-------------|
| Accès Serveur | `UpdateServerAccess` (251), `SetServerAccess` (252) | Contrôle d'accès en solo |
| Machinima | `RequestMachinimaActorModel` (260), `UpdateMachinimaScene` (262) | Outils cinématiques |
| Caméra | `RequestFlyCameraMode` (282) | Contrôle de la caméra |
| Interaction | `SyncInteractionChains` (290) | Chaînes d'interaction |
| Assets | 40+ paquets | Synchronisation des assets |

## Détails des Paquets Clés

### Connect (ID 0)

Paquet de connexion initial envoyé par les clients.

| Champ | Type | Description |
|-------|------|-------------|
| `protocolHash` | String | Hachage du protocole ASCII de 64 caractères |
| `clientType` | ClientType | Game ou Editor |
| `language` | String | Code de langue (ex: "en-US") |
| `identityToken` | String | Jeton d'identité d'authentification |
| `uuid` | UUID | UUID du joueur |
| `username` | String | Nom d'utilisateur du joueur (max 16 caractères) |
| `referralData` | byte[] | Données de référence optionnelles (max 4096 octets) |
| `referralSource` | HostAddress | Source de référence optionnelle |

**Taille maximale** : 38 161 octets

### Disconnect (ID 1)

Paquet de terminaison de connexion.

| Champ | Type | Description |
|-------|------|-------------|
| `reason` | String | Message de raison de déconnexion |
| `type` | DisconnectType | Disconnect, Crash, etc. |

**Taille maximale** : 16 384 007 octets

### Ping/Pong (ID 2/3)

Paquets de mesure de latence.

**Ping** (Serveur -> Client) :

| Champ | Type | Description |
|-------|------|-------------|
| `id` | int | Identifiant du ping |
| `time` | InstantData | Données d'horodatage |
| `lastPingValueRaw` | int | Dernier ping brut |
| `lastPingValueDirect` | int | Dernier ping direct |
| `lastPingValueTick` | int | Dernier ping tick |

**Pong** (Client -> Serveur) :

| Champ | Type | Description |
|-------|------|-------------|
| `id` | int | Identifiant de ping correspondant |
| `time` | InstantData | Données d'horodatage |
| `type` | PongType | Raw, Direct, ou Tick |
| `packetQueueSize` | short | Taille de la file d'attente du client |

### ClientMovement (ID 108)

Paquet d'état de mouvement du joueur.

| Champ | Type | Description |
|-------|------|-------------|
| `movementStates` | MovementStates | Indicateurs de mouvement |
| `relativePosition` | HalfFloatPosition | Delta de position |
| `absolutePosition` | Position | Coordonnées absolues |
| `bodyOrientation` | Direction | Rotation du corps |
| `lookOrientation` | Direction | Direction du regard/tête |
| `teleportAck` | TeleportAck | Accusé de réception de téléportation |
| `wishMovement` | Position | Mouvement souhaité |
| `velocity` | Vector3d | Vélocité actuelle |
| `mountedTo` | int | ID de l'entité montée |
| `riderMovementStates` | MovementStates | États de mouvement du cavalier |

**Taille maximale** : 153 octets

### SetChunk (ID 131)

Paquet de données de chunk (compressé).

| Champ | Type | Description |
|-------|------|-------------|
| `x` | int | Coordonnée X du chunk |
| `y` | int | Coordonnée Y du chunk |
| `z` | int | Coordonnée Z du chunk |
| `localLight` | byte[] | Données d'éclairage local |
| `globalLight` | byte[] | Données d'éclairage global |
| `data` | byte[] | Données de blocs |

**Taille maximale** : 12 288 040 octets
**Compression** : Zstd

### EntityUpdates (ID 161)

Paquet de synchronisation des entités (compressé).

| Champ | Type | Description |
|-------|------|-------------|
| `removed` | int[] | IDs des entités supprimées |
| `updates` | EntityUpdate[] | Mises à jour de l'état des entités |

**Taille maximale** : 1 677 721 600 octets
**Compression** : Zstd

### UpdatePlayerInventory (ID 170)

Paquet de synchronisation complète de l'inventaire (compressé).

| Champ | Type | Description |
|-------|------|-------------|
| `storage` | InventorySection | Section de stockage |
| `armor` | InventorySection | Section d'armure |
| `hotbar` | InventorySection | Section de barre d'accès rapide |
| `utility` | InventorySection | Objets utilitaires |
| `builderMaterial` | InventorySection | Matériaux de construction |
| `tools` | InventorySection | Section d'outils |
| `backpack` | InventorySection | Section de sac à dos |
| `sortType` | SortType | Type de tri actuel |

**Compression** : Zstd

### ChatMessage (ID 211)

Paquet de message de chat.

| Champ | Type | Description |
|-------|------|-------------|
| `message` | String | Contenu du message (max 4 096 000 caractères) |

**Taille maximale** : 16 384 006 octets

## Types de Déconnexion

L'énumération `DisconnectType` définit diverses raisons de déconnexion :

| Type | Description |
|------|-------------|
| `Disconnect` | Déconnexion normale |
| `Crash` | Plantage client/serveur |

## Référence des Fichiers Sources

| Composant | Fichier Source |
|-----------|----------------|
| Transport | `com/hypixel/hytale/server/core/io/transport/QUICTransport.java` |
| Base des Paquets | `com/hypixel/hytale/protocol/Packet.java` |
| Constantes du Protocole | `com/hypixel/hytale/protocol/ProtocolSettings.java` |
| IO des Paquets | `com/hypixel/hytale/protocol/io/PacketIO.java` |
| VarInt | `com/hypixel/hytale/protocol/io/VarInt.java` |
| Encodeur de Paquets | `com/hypixel/hytale/protocol/io/netty/PacketEncoder.java` |
| Gestionnaire Initial | `com/hypixel/hytale/server/core/io/handlers/InitialPacketHandler.java` |
| Gestionnaire de Jeu | `com/hypixel/hytale/server/core/io/handlers/game/GamePacketHandler.java` |
