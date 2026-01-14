---
id: add-world-event
title: AddWorldEvent
sidebar_label: AddWorldEvent
---

# AddWorldEvent

The `AddWorldEvent` is fired when a new world is being added to the server's universe. This event allows plugins to intercept and potentially cancel the addition of worlds, enabling custom world management logic.

## Event Information

| Property | Value |
|----------|-------|
| **Full Class Name** | `com.hypixel.hytale.server.core.universe.world.events.AddWorldEvent` |
| **Parent Class** | `WorldEvent` |
| **Implements** | `ICancellable` |
| **Cancellable** | Yes |
| **Source File** | `decompiled/com/hypixel/hytale/server/core/universe/world/events/AddWorldEvent.java:7` |

## Declaration

```java
public class AddWorldEvent extends WorldEvent implements ICancellable {
   private boolean cancelled;

   public AddWorldEvent(@Nonnull World world) {
      super(world);
   }

   public boolean isCancelled() {
      return this.cancelled;
   }

   public void setCancelled(boolean cancelled) {
      this.cancelled = cancelled;
   }
}
```

## Fields

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `cancelled` | `boolean` | `isCancelled()` | Whether the event has been cancelled |

## Inherited Fields

From `WorldEvent`:

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `world` | `World` | `getWorld()` | The world being added to the server |

## Methods

### isCancelled()

```java
public boolean isCancelled()
```

Returns whether the event has been cancelled.

**Returns:** `boolean` - `true` if the world addition has been cancelled, `false` otherwise

### setCancelled(boolean)

```java
public void setCancelled(boolean cancelled)
```

Sets whether the event should be cancelled. When cancelled, the world will not be added to the server.

**Parameters:**
- `cancelled` - `true` to cancel the world addition, `false` to allow it

### getWorld()

```java
public World getWorld()
```

Inherited from `WorldEvent`. Returns the world that is being added.

**Returns:** `World` - The world instance being added to the server

## Usage Example

```java
import com.hypixel.hytale.server.core.universe.world.events.AddWorldEvent;
import com.hypixel.hytale.event.EventPriority;

// Register a listener to control world additions
eventBus.register(EventPriority.NORMAL, AddWorldEvent.class, event -> {
    World world = event.getWorld();

    // Example: Prevent adding worlds with certain names
    if (world.getName().startsWith("restricted_")) {
        event.setCancelled(true);
        System.out.println("Blocked addition of restricted world: " + world.getName());
        return;
    }

    // Log world additions
    System.out.println("World being added: " + world.getName());
});
```

## When This Event Fires

The `AddWorldEvent` is dispatched when:

1. A new world is being registered with the server's universe system
2. During server startup when configured worlds are loaded
3. When plugins programmatically create and add new worlds
4. When dynamic world generation creates a new world instance

The event fires **before** the world is fully added to the universe, allowing handlers to cancel the operation if needed.

## Cancellation Behavior

When the event is cancelled:
- The world will not be added to the server's world list
- The world will not be accessible to players or other systems
- Any associated resources may be cleaned up depending on implementation

## Related Events

- [RemoveWorldEvent](./remove-world-event.md) - Fired when a world is being removed
- [StartWorldEvent](./start-world-event.md) - Fired when a world starts after being added
- [AllWorldsLoadedEvent](./all-worlds-loaded-event.md) - Fired when all configured worlds have been loaded

## Source Reference

- **Event Definition:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/AddWorldEvent.java`
- **Parent Class:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/WorldEvent.java`
- **Cancellable Interface:** `decompiled/com/hypixel/hytale/event/ICancellable.java`
