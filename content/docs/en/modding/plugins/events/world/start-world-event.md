---
id: start-world-event
title: StartWorldEvent
sidebar_label: StartWorldEvent
---

# StartWorldEvent

The `StartWorldEvent` is fired when a world has been initialized and is starting up. This event signals that the world is ready for use and allows plugins to perform initialization tasks specific to the world.

## Event Information

| Property | Value |
|----------|-------|
| **Full Class Name** | `com.hypixel.hytale.server.core.universe.world.events.StartWorldEvent` |
| **Parent Class** | `WorldEvent` |
| **Cancellable** | No |
| **Source File** | `decompiled/com/hypixel/hytale/server/core/universe/world/events/StartWorldEvent.java:6` |

## Declaration

```java
public class StartWorldEvent extends WorldEvent {
   public StartWorldEvent(@Nonnull World world) {
      super(world);
   }
}
```

## Fields

This event does not define any additional fields beyond those inherited from `WorldEvent`.

## Inherited Fields

From `WorldEvent`:

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `world` | `World` | `getWorld()` | The world that has started |

## Methods

### getWorld()

```java
public World getWorld()
```

Inherited from `WorldEvent`. Returns the world that has started.

**Returns:** `World` - The world instance that has completed its startup process

## Usage Example

```java
import com.hypixel.hytale.server.core.universe.world.events.StartWorldEvent;
import com.hypixel.hytale.event.EventPriority;

// Register a listener to perform actions when worlds start
eventBus.register(EventPriority.NORMAL, StartWorldEvent.class, event -> {
    World world = event.getWorld();

    // Log world startup
    System.out.println("World started: " + world.getName());

    // Example: Initialize world-specific features
    initializeWorldFeatures(world);

    // Example: Load world-specific configuration
    loadWorldConfig(world);

    // Example: Schedule world-specific tasks
    scheduleWorldTasks(world);
});

private void initializeWorldFeatures(World world) {
    // Set up spawn points, NPCs, or other world-specific elements
    if (world.getName().equals("spawn")) {
        setupSpawnWorld(world);
    } else if (world.getName().startsWith("dungeon_")) {
        setupDungeonWorld(world);
    }
}

private void loadWorldConfig(World world) {
    // Load any configuration specific to this world
    String configPath = "worlds/" + world.getName() + "/config.json";
    // ... load configuration
}

private void scheduleWorldTasks(World world) {
    // Schedule recurring tasks for the world
    // Example: mob spawning, weather changes, etc.
}
```

## When This Event Fires

The `StartWorldEvent` is dispatched when:

1. A world has been successfully added to the universe and is now starting
2. The world's initialization process has completed
3. The world is ready to accept players and process game logic
4. After `AddWorldEvent` has been processed and not cancelled

The event fires **after** the world has been fully initialized, meaning:
- World chunks can be loaded
- Entities can be spawned
- Players can be teleported to the world
- World-specific systems are operational

## Event Lifecycle

The typical world lifecycle events follow this order:

1. `AddWorldEvent` - World is being added (cancellable)
2. `StartWorldEvent` - World has started (not cancellable)
3. (World is active and operational)
4. `RemoveWorldEvent` - World is being removed (cancellable)

## Related Events

- [AddWorldEvent](./add-world-event.md) - Fired before the world is added (cancellable)
- [RemoveWorldEvent](./remove-world-event.md) - Fired when a world is being removed
- [AllWorldsLoadedEvent](./all-worlds-loaded-event.md) - Fired when all configured worlds have been loaded

## Common Use Cases

### World-Specific Initialization

```java
eventBus.register(StartWorldEvent.class, event -> {
    World world = event.getWorld();

    // Initialize custom world borders
    setWorldBorder(world, 10000);

    // Set world-specific game rules
    applyWorldRules(world);

    // Register world-specific event handlers
    registerWorldHandlers(world);
});
```

### Logging and Monitoring

```java
eventBus.register(EventPriority.FIRST, StartWorldEvent.class, event -> {
    World world = event.getWorld();

    // Track world startup metrics
    long startTime = System.currentTimeMillis();
    metrics.recordWorldStart(world.getName(), startTime);

    // Log for monitoring
    logger.info("World '{}' has started at {}", world.getName(), startTime);
});
```

### Dynamic World Management

```java
eventBus.register(StartWorldEvent.class, event -> {
    World world = event.getWorld();

    // If this is a temporary/instance world, schedule cleanup
    if (world.getName().startsWith("instance_")) {
        scheduleWorldCleanup(world, 30, TimeUnit.MINUTES);
    }
});
```

## Source Reference

- **Event Definition:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/StartWorldEvent.java`
- **Parent Class:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/WorldEvent.java`
