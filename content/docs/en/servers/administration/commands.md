---
id: commands
title: Server Commands
sidebar_label: Commands
sidebar_position: 1
---

# Server Commands

Console and in-game commands for Hytale server administration.

---

## Player Commands

Commands for managing players, their game modes, stats, effects, and camera.

### gamemode

Changes the game mode of a player.

| Property | Value |
|----------|-------|
| **Syntax** | `/gamemode <gamemode> [player]` |
| **Aliases** | `gm` |
| **Permission** | `gamemode.self`, `gamemode.other` |

**Parameters:**
- `gamemode` - The game mode to set (e.g., Creative, Adventure, Survival)
- `player` (optional) - Target player (requires `gamemode.other` permission)

**Examples:**
```
/gamemode creative
/gamemode adventure PlayerName
/gm survival
```

---

### kill

Instantly kills a player.

| Property | Value |
|----------|-------|
| **Syntax** | `/kill [player]` |
| **Permission** | `kill.self`, `kill.other` |

**Parameters:**
- `player` (optional) - Target player (requires `kill.other` permission)

**Examples:**
```
/kill
/kill PlayerName
```

---

### damage

Deals damage to a player.

| Property | Value |
|----------|-------|
| **Syntax** | `/damage [amount] [--silent] [player]` |
| **Aliases** | `hurt` |
| **Permission** | `damage.self`, `damage.other` |

**Parameters:**
- `amount` (optional) - Amount of damage to deal (default: 1.0)
- `--silent` (flag) - Suppress damage notification message
- `player` (optional) - Target player (requires `damage.other` permission)

**Examples:**
```
/damage
/damage 5.0
/damage 10 --silent PlayerName
/hurt 3.5
```

---

### hide

Hides a player from other players.

| Property | Value |
|----------|-------|
| **Syntax** | `/hide <player> [target]` |
| **Subcommands** | `show`, `all`, `showall` |

**Parameters:**
- `player` - The player to hide
- `target` (optional) - Hide from a specific player only (hides from all if not specified)

**Subcommands:**
- `/hide show <player> [target]` - Make a player visible again
- `/hide all` - Hide all players from each other
- `/hide showall` - Make all players visible to each other

**Examples:**
```
/hide PlayerName
/hide PlayerName TargetPlayer
/hide show PlayerName
/hide all
/hide showall
```

---

### whereami

Displays the current location and world information.

| Property | Value |
|----------|-------|
| **Syntax** | `/whereami [player]` |
| **Permission** | `whereami.self`, `whereami.other` |
| **Game Mode** | Creative |

**Parameters:**
- `player` (optional) - Target player (requires `whereami.other` permission)

**Information displayed:**
- World name
- Chunk coordinates (X, Y, Z)
- Position coordinates (X, Y, Z)
- Head rotation (yaw, pitch, roll)
- Direction and axis information
- Chunk saving status

**Examples:**
```
/whereami
/whereami PlayerName
```

---

### whoami

Displays player identity information.

| Property | Value |
|----------|-------|
| **Syntax** | `/whoami [player]` |
| **Aliases** | `uuid` |
| **Game Mode** | Adventure |

**Parameters:**
- `player` (optional) - Target player

**Information displayed:**
- Player UUID
- Username
- Language preference

**Examples:**
```
/whoami
/uuid
/whoami PlayerName
```

---

### player stats

Manage player statistics.

| Property | Value |
|----------|-------|
| **Syntax** | `/player stats <subcommand>` |
| **Aliases** | `stat` |

**Subcommands:**

| Subcommand | Syntax | Description |
|------------|--------|-------------|
| `get` | `/player stats get <statName> [player]` | Get the value of a stat |
| `set` | `/player stats set <statName> <value> [player]` | Set a stat to a specific value |
| `add` | `/player stats add <statName> <value> [player]` | Add to a stat value |
| `reset` | `/player stats reset [player]` | Reset all stats |
| `settomax` | `/player stats settomax <statName> [player]` | Set a stat to its maximum value |
| `dump` | `/player stats dump [player]` | Display all stats |

**Examples:**
```
/player stats get health
/player stats set health 100
/player stats add stamina 50
/player stats settomax health
/player stats dump
```

---

### player effect

Apply or clear effects on players.

| Property | Value |
|----------|-------|
| **Syntax** | `/player effect <subcommand>` |

**Subcommands:**

| Subcommand | Syntax | Description |
|------------|--------|-------------|
| `apply` | `/player effect apply <effect> [duration] [player]` | Apply an effect |
| `clear` | `/player effect clear [player]` | Clear all effects |

**Parameters:**
- `effect` - The effect asset ID to apply
- `duration` (optional) - Duration in ticks (default: 100)
- `player` (optional) - Target player

**Permissions:**
- `player.effect.apply.self`, `player.effect.apply.other`
- `player.effect.clear.self`, `player.effect.clear.other`

**Examples:**
```
/player effect apply speed_boost
/player effect apply regeneration 200
/player effect apply strength 150 PlayerName
/player effect clear
```

---

### player camera

Control player camera modes.

| Property | Value |
|----------|-------|
| **Syntax** | `/player camera <subcommand>` |

**Subcommands:**

| Subcommand | Syntax | Description |
|------------|--------|-------------|
| `reset` | `/player camera reset [player]` | Reset camera to default |
| `topdown` | `/player camera topdown [player]` | Set top-down camera view |
| `sidescroller` | `/player camera sidescroller [player]` | Set side-scroller camera view |
| `demo` | `/player camera demo <activate\|deactivate>` | Demo camera mode |

**Examples:**
```
/player camera reset
/player camera topdown
/player camera sidescroller PlayerName
/player camera demo activate
```

---

## Entity Commands

Commands for managing entities in the world.

### entity clone

Clones an entity.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity clone [entity] [count]` |

**Parameters:**
- `entity` (optional) - Entity ID to clone (uses looked-at entity if not specified)
- `count` (optional) - Number of clones to create (default: 1)

**Examples:**
```
/entity clone
/entity clone 12345
/entity clone 12345 5
```

---

### entity remove

Removes an entity from the world.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity remove [entity] [--others]` |

**Parameters:**
- `entity` (optional) - Entity ID to remove (uses looked-at entity if not specified)
- `--others` (flag) - Remove all other non-player entities except the specified one

**Examples:**
```
/entity remove
/entity remove 12345
/entity remove 12345 --others
```

---

### entity dump

Dumps entity data to the server log.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity dump [entity]` |

**Parameters:**
- `entity` (optional) - Entity ID to dump (uses looked-at entity if not specified)

**Examples:**
```
/entity dump
/entity dump 12345
```

---

### entity clean

Removes all non-player entities from the current world.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity clean` |

**Warning:** This is a destructive command that removes all entities except players.

**Examples:**
```
/entity clean
```

---

### entity count

Displays the total entity count in the current world.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity count` |

**Examples:**
```
/entity count
```

---

### entity stats

Manage entity statistics.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity stats <subcommand>` |
| **Aliases** | `stat` |

**Subcommands:**

| Subcommand | Syntax | Description |
|------------|--------|-------------|
| `get` | `/entity stats get <statName> [entity]` | Get the value of a stat |
| `set` | `/entity stats set <statName> <value> [entity]` | Set a stat value |
| `add` | `/entity stats add <statName> <value> [entity]` | Add to a stat value |
| `reset` | `/entity stats reset [entity]` | Reset all stats |
| `settomax` | `/entity stats settomax <statName> [entity]` | Set a stat to maximum |
| `dump` | `/entity stats dump [entity]` | Display all stats |

**Examples:**
```
/entity stats get health
/entity stats set health 50
/entity stats dump
```

---

### entity effect

Apply an effect to entities.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity effect <effect> [duration] [entity]` |

**Parameters:**
- `effect` - The effect asset ID to apply
- `duration` (optional) - Duration in ticks (default: 100)
- `entity` (optional) - Target entity

**Examples:**
```
/entity effect poison
/entity effect slow 200
```

---

### entity intangible

Makes an entity intangible (no collision).

| Property | Value |
|----------|-------|
| **Syntax** | `/entity intangible [--remove] [entity]` |

**Parameters:**
- `--remove` (flag) - Remove intangible status instead of adding it
- `entity` (optional) - Target entity

**Examples:**
```
/entity intangible
/entity intangible --remove
/entity intangible 12345
```

---

### entity invulnerable

Makes an entity invulnerable to damage.

| Property | Value |
|----------|-------|
| **Syntax** | `/entity invulnerable [--remove] [entity]` |

**Parameters:**
- `--remove` (flag) - Remove invulnerable status instead of adding it
- `entity` (optional) - Target entity

**Examples:**
```
/entity invulnerable
/entity invulnerable --remove
/entity invulnerable 12345
```

---

## World Commands

Commands for managing chunks and world maps.

### chunk info

Displays detailed information about a chunk.

| Property | Value |
|----------|-------|
| **Syntax** | `/chunk info <x> <z>` |

**Parameters:**
- `x z` - Chunk coordinates (supports relative coordinates with ~)

**Information displayed:**
- Initialization status
- Generation status
- Ticking status
- Saving status
- Section details

**Examples:**
```
/chunk info 0 0
/chunk info ~ ~
/chunk info ~5 ~-3
```

---

### chunk load

Loads a chunk into memory.

| Property | Value |
|----------|-------|
| **Syntax** | `/chunk load <x> <z> [--markdirty]` |

**Parameters:**
- `x z` - Chunk coordinates (supports relative coordinates with ~)
- `--markdirty` (flag) - Mark the chunk as needing to be saved

**Examples:**
```
/chunk load 0 0
/chunk load ~ ~
/chunk load 10 10 --markdirty
```

---

### chunk unload

Unloads a chunk from memory.

| Property | Value |
|----------|-------|
| **Syntax** | `/chunk unload <x> <z>` |

**Parameters:**
- `x z` - Chunk coordinates (supports relative coordinates with ~)

**Examples:**
```
/chunk unload 0 0
/chunk unload ~ ~
```

---

### chunk regenerate

Regenerates a chunk (WARNING: destructive).

| Property | Value |
|----------|-------|
| **Syntax** | `/chunk regenerate <x> <z>` |

**Parameters:**
- `x z` - Chunk coordinates (supports relative coordinates with ~)

**Warning:** This will regenerate the chunk, losing all player modifications.

**Examples:**
```
/chunk regenerate 0 0
/chunk regenerate ~ ~
```

---

### worldmap discover

Discovers zones on the world map for a player.

| Property | Value |
|----------|-------|
| **Syntax** | `/worldmap discover [zone]` |
| **Aliases** | `disc` |

**Parameters:**
- `zone` (optional) - Zone name to discover, or "all" to discover all zones. If not specified, lists available zones.

**Examples:**
```
/worldmap discover
/worldmap discover all
/worldmap discover ForestZone
/map disc all
```

---

### worldmap undiscover

Removes discovered zones from the world map.

| Property | Value |
|----------|-------|
| **Syntax** | `/worldmap undiscover [zone]` |

**Parameters:**
- `zone` (optional) - Zone name to undiscover, or "all" to undiscover all zones. If not specified, lists discovered zones.

**Examples:**
```
/worldmap undiscover
/worldmap undiscover all
/worldmap undiscover ForestZone
```

---

## Server Commands

Commands for server administration.

### stop

Stops the server gracefully.

| Property | Value |
|----------|-------|
| **Syntax** | `/stop [--crash]` |
| **Aliases** | `shutdown` |

**Parameters:**
- `--crash` (flag) - Simulate a crash shutdown instead of graceful shutdown

**Examples:**
```
/stop
/shutdown
/stop --crash
```

---

### kick

Kicks a player from the server.

| Property | Value |
|----------|-------|
| **Syntax** | `/kick <player>` |

**Parameters:**
- `player` - The player to kick

**Examples:**
```
/kick PlayerName
```

---

### who

Lists all online players by world.

| Property | Value |
|----------|-------|
| **Syntax** | `/who` |
| **Game Mode** | Adventure |

**Information displayed:**
- Players organized by world
- Display names (if set) and usernames

**Examples:**
```
/who
```

---

### maxplayers

Gets or sets the maximum player count.

| Property | Value |
|----------|-------|
| **Syntax** | `/maxplayers [amount]` |

**Parameters:**
- `amount` (optional) - New maximum player count. If not specified, displays current value.

**Examples:**
```
/maxplayers
/maxplayers 50
```

---

### auth

Authentication management commands.

| Property | Value |
|----------|-------|
| **Syntax** | `/auth <subcommand>` |

**Subcommands:**

| Subcommand | Description |
|------------|-------------|
| `status` | Check authentication status |
| `login` | Login to authentication service |
| `select` | Select authentication account |
| `logout` | Logout from authentication |
| `cancel` | Cancel pending authentication |
| `persistence` | Manage authentication persistence |

**Examples:**
```
/auth status
/auth login
/auth logout
```

---

## Utility Commands

General utility commands.

### help

Displays help information for commands.

| Property | Value |
|----------|-------|
| **Syntax** | `/help [command]` |
| **Aliases** | `?` |
| **Game Mode** | Adventure |

**Parameters:**
- `command` (optional) - Command name to get help for. Opens command list UI if not specified.

**Examples:**
```
/help
/?
/help gamemode
```

---

### backup

Creates a backup of the server data.

| Property | Value |
|----------|-------|
| **Syntax** | `/backup` |

**Requirements:**
- Server must be fully booted
- Backup directory must be configured in server options

**Examples:**
```
/backup
```

---

### notify

Sends a notification to all players.

| Property | Value |
|----------|-------|
| **Syntax** | `/notify [style] <message>` |

**Parameters:**
- `style` (optional) - Notification style (Default, Warning, Error, etc.)
- `message` - The message to send (supports formatted messages with `{...}`)

**Examples:**
```
/notify Hello everyone!
/notify Warning Server restart in 5 minutes
/notify {"text": "Formatted message", "color": "red"}
```

---

### sound 2d

Plays a 2D sound effect.

| Property | Value |
|----------|-------|
| **Syntax** | `/sound 2d <sound> [category] [--all] [player]` |
| **Aliases** | `play` |

**Parameters:**
- `sound` - Sound event asset ID
- `category` (optional) - Sound category (default: SFX)
- `--all` (flag) - Play to all players in the world
- `player` (optional) - Target player

**Examples:**
```
/sound 2d ui_click
/sound play notification SFX
/sound 2d alert --all
```

---

### sound 3d

Plays a 3D positional sound effect.

| Property | Value |
|----------|-------|
| **Syntax** | `/sound 3d <sound> [category] <x> <y> <z> [--all] [player]` |
| **Aliases** | `play3d` |

**Parameters:**
- `sound` - Sound event asset ID
- `category` (optional) - Sound category (default: SFX)
- `x y z` - Position coordinates (supports relative coordinates with ~)
- `--all` (flag) - Play to all players in the world
- `player` (optional) - Target player

**Examples:**
```
/sound 3d explosion SFX 100 64 200
/sound play3d ambient ~ ~ ~
/sound 3d alert SFX ~ ~10 ~ --all
```

---

## Debug Commands

Commands for debugging and monitoring.

### ping

Displays ping/latency information.

| Property | Value |
|----------|-------|
| **Syntax** | `/ping [--detail] [player]` |
| **Subcommands** | `clear`, `graph` |
| **Game Mode** | Adventure |

**Parameters:**
- `--detail` (flag) - Show detailed ping information
- `player` (optional) - Target player

**Subcommands:**
- `/ping clear [player]` - Clear ping history
- `/ping graph [width] [height] [player]` - Display ping graph

**Examples:**
```
/ping
/ping --detail
/ping PlayerName
/ping clear
/ping graph 80 15
```

---

### version

Displays server version information.

| Property | Value |
|----------|-------|
| **Syntax** | `/version` |

**Information displayed:**
- Server version
- Patchline
- Environment (if not release)

**Examples:**
```
/version
```

---

### log

Manages logger levels.

| Property | Value |
|----------|-------|
| **Syntax** | `/log <logger> [level] [--save] [--reset]` |

**Parameters:**
- `logger` - Logger name (or "global" for the global logger)
- `level` (optional) - Log level (OFF, SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST, ALL)
- `--save` (flag) - Save the log level to server config
- `--reset` (flag) - Reset the logger to default level

**Examples:**
```
/log global
/log global INFO
/log global FINE --save
/log network WARNING
/log network --reset
```

---

### server stats memory

Displays server memory statistics.

| Property | Value |
|----------|-------|
| **Syntax** | `/server stats memory` |
| **Aliases** | `mem` |

**Information displayed:**
- Total and free physical memory
- Total and free swap memory
- Heap memory usage (init, used, committed, max, free)
- Non-heap memory usage
- Objects pending finalization

**Examples:**
```
/server stats memory
/server stats mem
```

---

### server stats cpu

Displays server CPU statistics.

| Property | Value |
|----------|-------|
| **Syntax** | `/server stats cpu` |

**Information displayed:**
- System CPU load
- Process CPU load
- System load average
- Process uptime

**Examples:**
```
/server stats cpu
```
