---
id: remove-world-event
title: RemoveWorldEvent
sidebar_label: RemoveWorldEvent
---

# RemoveWorldEvent

The `RemoveWorldEvent` is fired when a world is being removed from the server's universe. This event provides information about why the world is being removed and allows conditional cancellation based on the removal reason.

## Event Information

| Property | Value |
|----------|-------|
| **Full Class Name** | `com.hypixel.hytale.server.core.universe.world.events.RemoveWorldEvent` |
| **Parent Class** | `WorldEvent` |
| **Implements** | `ICancellable` |
| **Cancellable** | Yes (conditional based on RemovalReason) |
| **Source File** | `decompiled/com/hypixel/hytale/server/core/universe/world/events/RemoveWorldEvent.java:7` |

## Declaration

```java
public class RemoveWorldEvent extends WorldEvent implements ICancellable {
   private boolean cancelled;
   @Nonnull
   private final RemoveWorldEvent.RemovalReason removalReason;

   public RemoveWorldEvent(@Nonnull World world, @Nonnull RemoveWorldEvent.RemovalReason removalReason) {
      super(world);
      this.removalReason = removalReason;
   }

   public boolean isCancelled() {
      return this.cancelled;
   }

   public void setCancelled(boolean cancelled) {
      // Conditional cancellation based on removal reason
      this.cancelled = cancelled;
   }

   @Nonnull
   public RemoveWorldEvent.RemovalReason getRemovalReason() {
      return this.removalReason;
   }

   public static enum RemovalReason {
      GENERAL,
      EXCEPTIONAL;
   }
}
```

## Fields

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `cancelled` | `boolean` | `isCancelled()` | Whether the event has been cancelled |
| `removalReason` | `RemoveWorldEvent.RemovalReason` | `getRemovalReason()` | The reason why the world is being removed |

## Inherited Fields

From `WorldEvent`:

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `world` | `World` | `getWorld()` | The world being removed from the server |

## Methods

### isCancelled()

```java
public boolean isCancelled()
```

Returns whether the event has been cancelled.

**Returns:** `boolean` - `true` if the world removal has been cancelled, `false` otherwise

### setCancelled(boolean)

```java
public void setCancelled(boolean cancelled)
```

Sets whether the event should be cancelled. Note that cancellation may be conditional based on the `RemovalReason`. Exceptional removals may not be cancellable.

**Parameters:**
- `cancelled` - `true` to attempt to cancel the world removal, `false` to allow it

### getRemovalReason()

```java
@Nonnull
public RemoveWorldEvent.RemovalReason getRemovalReason()
```

Returns the reason why the world is being removed.

**Returns:** `RemoveWorldEvent.RemovalReason` - The removal reason enum value

### getWorld()

```java
public World getWorld()
```

Inherited from `WorldEvent`. Returns the world that is being removed.

**Returns:** `World` - The world instance being removed from the server

## Inner Classes

### RemovalReason (enum)

The `RemovalReason` enum indicates why the world is being removed from the server.

```java
public static enum RemovalReason {
   GENERAL,
   EXCEPTIONAL;
}
```

| Value | Description |
|-------|-------------|
| `GENERAL` | Normal world removal, typically initiated by plugins or standard server operations. This type of removal can usually be cancelled. |
| `EXCEPTIONAL` | Removal due to an exceptional circumstance such as an error or critical failure. This type of removal may not be cancellable to ensure server stability. |

## Usage Example

```java
import com.hypixel.hytale.server.core.universe.world.events.RemoveWorldEvent;
import com.hypixel.hytale.event.EventPriority;

// Register a listener to control world removals
eventBus.register(EventPriority.NORMAL, RemoveWorldEvent.class, event -> {
    World world = event.getWorld();
    RemoveWorldEvent.RemovalReason reason = event.getRemovalReason();

    // Log all world removals
    System.out.println("World removal requested: " + world.getName() +
                       " (Reason: " + reason + ")");

    // Only try to cancel GENERAL removals (EXCEPTIONAL may not be cancellable)
    if (reason == RemoveWorldEvent.RemovalReason.GENERAL) {
        // Example: Prevent removal of protected worlds
        if (isProtectedWorld(world)) {
            event.setCancelled(true);
            System.out.println("Blocked removal of protected world: " + world.getName());
            return;
        }

        // Example: Prevent removal if players are still in the world
        if (world.getPlayerCount() > 0) {
            event.setCancelled(true);
            System.out.println("Cannot remove world with active players: " + world.getName());
            return;
        }
    } else {
        // EXCEPTIONAL removals - typically cannot be prevented
        System.out.println("Exceptional world removal cannot be cancelled");
    }
});

private boolean isProtectedWorld(World world) {
    // Custom logic to determine if world is protected
    return world.getName().equals("spawn") || world.getName().equals("hub");
}
```

## When This Event Fires

The `RemoveWorldEvent` is dispatched when:

1. A world is being unregistered from the server's universe system
2. During server shutdown when worlds are being cleaned up
3. When plugins programmatically request world removal
4. When an error or exceptional condition requires a world to be removed (`EXCEPTIONAL` reason)
5. When dynamic world management removes temporary or instance worlds

The event fires **before** the world is fully removed, allowing handlers to potentially cancel the operation.

## Cancellation Behavior

When the event is cancelled:
- The world will remain loaded and accessible (for `GENERAL` removals)
- Players can continue to interact with the world
- The world will stay in the server's world list

**Important:** Cancellation of `EXCEPTIONAL` removals may be ignored by the system to ensure server stability. Always check the `RemovalReason` before attempting to cancel.

## Related Events

- [AddWorldEvent](./add-world-event.md) - Fired when a world is being added
- [StartWorldEvent](./start-world-event.md) - Fired when a world starts
- [AllWorldsLoadedEvent](./all-worlds-loaded-event.md) - Fired when all configured worlds have been loaded

## Source Reference

- **Event Definition:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/RemoveWorldEvent.java`
- **Parent Class:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/WorldEvent.java`
- **Cancellable Interface:** `decompiled/com/hypixel/hytale/event/ICancellable.java`
