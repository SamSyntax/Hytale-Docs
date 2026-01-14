---
id: world-path-changed-event
title: WorldPathChangedEvent
sidebar_label: WorldPathChangedEvent
---

# WorldPathChangedEvent

Fired when the world path configuration changes. This event is useful for tracking navigation path updates and world structure changes that affect how entities navigate through the world.

## Event Information

| Property | Value |
|----------|-------|
| **Full Class Name** | `com.hypixel.hytale.server.core.universe.world.path.WorldPathChangedEvent` |
| **Parent Class** | `IEvent<Void>` |
| **Cancellable** | No |
| **Async** | No |
| **Source File** | `decompiled/com/hypixel/hytale/server/core/universe/world/path/WorldPathChangedEvent.java` |

## Declaration

```java
public class WorldPathChangedEvent implements IEvent<Void> {
   private WorldPath worldPath;

   public WorldPathChangedEvent(WorldPath worldPath) {
      Objects.requireNonNull(worldPath, "World path must not be null in an event");
      this.worldPath = worldPath;
   }

   public WorldPath getWorldPath() {
      return this.worldPath;
   }

   @Nonnull
   @Override
   public String toString() {
      return "WorldPathChangedEvent{worldPath=" + this.worldPath + "}";
   }
}
```

## Fields

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `worldPath` | `WorldPath` | `getWorldPath()` | The world path object that has changed |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getWorldPath` | `public WorldPath getWorldPath()` | Returns the world path that has been modified |

## Validation

The event constructor validates that:
- `worldPath` must not be null - throws `NullPointerException` with message "World path must not be null in an event"

## Usage Example

```java
import com.hypixel.hytale.server.core.universe.world.path.WorldPathChangedEvent;
import com.hypixel.hytale.server.core.universe.world.path.WorldPath;
import com.hypixel.hytale.event.EventBus;
import com.hypixel.hytale.event.EventPriority;

public class PathfindingPlugin extends PluginBase {

    @Override
    public void onEnable() {
        EventBus.register(WorldPathChangedEvent.class, this::onWorldPathChanged, EventPriority.NORMAL);
    }

    private void onWorldPathChanged(WorldPathChangedEvent event) {
        WorldPath worldPath = event.getWorldPath();

        // React to path changes
        getLogger().info("World path changed: " + worldPath.toString());

        // Update any cached pathfinding data
        invalidatePathfindingCache(worldPath);

        // Notify NPCs that may need to recalculate routes
        notifyAffectedEntities(worldPath);
    }

    private void invalidatePathfindingCache(WorldPath worldPath) {
        // Clear cached paths that may be affected by the change
    }

    private void notifyAffectedEntities(WorldPath worldPath) {
        // Update entities whose navigation may be affected
    }
}
```

## When This Event Fires

The `WorldPathChangedEvent` is fired when:

1. **Path configuration updates** - When world navigation paths are modified
2. **World structure changes** - When changes to the world affect pathfinding routes
3. **Dynamic path recalculation** - When the game recalculates available paths

The event fires **after** the path change has been applied, allowing handlers to:
- Update cached pathfinding data
- Notify affected entities
- Log navigation changes
- Trigger dependent systems

## Understanding WorldPath

The `WorldPath` object represents navigation path information in the world, which may include:
- Waypoints and connections
- Navigation mesh data
- Path constraints and costs
- Accessibility information

## Use Cases

- **Custom Pathfinding**: Integrate with custom navigation systems
- **Cache Invalidation**: Clear stale pathfinding caches
- **NPC Behavior**: Update NPC navigation when paths change
- **Debugging**: Track path changes for troubleshooting
- **Analytics**: Monitor world navigation updates

## Related Events

- [AddWorldEvent](./add-world-event) - Fired when a world is added
- [StartWorldEvent](./start-world-event) - Fired when a world starts

## Source Reference

`decompiled/com/hypixel/hytale/server/core/universe/world/path/WorldPathChangedEvent.java`
