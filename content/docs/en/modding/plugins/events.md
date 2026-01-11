---
id: events
title: Event System
sidebar_label: Events
sidebar_position: 4
---

# Event System

React to game events in your plugins.

## Registering Events

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    player.sendMessage("Welcome!");
}
```

## Common Events

| Event | Trigger |
|-------|---------|
| `PlayerJoinEvent` | Player connects |
| `PlayerQuitEvent` | Player disconnects |
| `BlockBreakEvent` | Block mined |
| `EntityDamageEvent` | Entity takes damage |
