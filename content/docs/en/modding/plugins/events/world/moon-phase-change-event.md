---
id: moon-phase-change-event
title: MoonPhaseChangeEvent
sidebar_label: MoonPhaseChangeEvent
---

# MoonPhaseChangeEvent

The `MoonPhaseChangeEvent` is fired when the moon phase changes in the world. This is an ECS (Entity Component System) event that extends `EcsEvent`, providing information about the new moon phase. This event is not cancellable.

## Event Information

| Property | Value |
|----------|-------|
| **Full Class Name** | `com.hypixel.hytale.server.core.universe.world.events.ecs.MoonPhaseChangeEvent` |
| **Parent Class** | `EcsEvent` |
| **Cancellable** | No |
| **Event Type** | ECS Event |
| **Source File** | `decompiled/com/hypixel/hytale/server/core/universe/world/events/ecs/MoonPhaseChangeEvent.java:5` |

## Declaration

```java
public class MoonPhaseChangeEvent extends EcsEvent {
   private final int newMoonPhase;

   public MoonPhaseChangeEvent(int newMoonPhase) {
      this.newMoonPhase = newMoonPhase;
   }

   public int getNewMoonPhase() {
      return this.newMoonPhase;
   }
}
```

## Fields

| Field | Type | Accessor | Description |
|-------|------|----------|-------------|
| `newMoonPhase` | `int` | `getNewMoonPhase()` | The new moon phase value |

## Methods

### getNewMoonPhase()

```java
public int getNewMoonPhase()
```

Returns the new moon phase value. Moon phases typically cycle through a fixed number of values representing different phases of the lunar cycle.

**Returns:** `int` - The new moon phase index

## Moon Phase Values

While the exact moon phase values depend on the implementation, typical moon phases in games follow a pattern similar to:

| Phase Value | Phase Name | Description |
|-------------|------------|-------------|
| 0 | New Moon | Moon is not visible |
| 1 | Waxing Crescent | Small sliver visible on right |
| 2 | First Quarter | Right half visible |
| 3 | Waxing Gibbous | Most of right side visible |
| 4 | Full Moon | Entire moon visible |
| 5 | Waning Gibbous | Most of left side visible |
| 6 | Last Quarter | Left half visible |
| 7 | Waning Crescent | Small sliver visible on left |

**Note:** The actual phase values and their meanings may vary. Consult the game documentation for exact values.

## ECS Event System

This event is part of Hytale's Entity Component System (ECS) event architecture:

```java
public abstract class EcsEvent {
   public EcsEvent() {
   }
}
```

Unlike `CancellableEcsEvent`, this event cannot be cancelled as moon phase changes are determined by the game's time system.

## Usage Example

```java
import com.hypixel.hytale.server.core.universe.world.events.ecs.MoonPhaseChangeEvent;

// Register an ECS event listener for moon phase changes
ecsEventManager.register(MoonPhaseChangeEvent.class, event -> {
    int newPhase = event.getNewMoonPhase();

    // Log the phase change
    System.out.println("Moon phase changed to: " + getMoonPhaseName(newPhase));

    // Example: Trigger events based on moon phase
    switch (newPhase) {
        case 0: // New Moon
            triggerNewMoonEvents();
            break;
        case 4: // Full Moon
            triggerFullMoonEvents();
            break;
    }

    // Example: Adjust mob spawning based on moon phase
    adjustMobSpawning(newPhase);

    // Example: Update ambient lighting
    updateAmbientLighting(newPhase);
});

private String getMoonPhaseName(int phase) {
    String[] phases = {
        "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
        "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
    };
    return phase >= 0 && phase < phases.length ? phases[phase] : "Unknown";
}

private void triggerNewMoonEvents() {
    // Special events during new moon
    // Example: Darker nights, special mob spawns
}

private void triggerFullMoonEvents() {
    // Special events during full moon
    // Example: Werewolves, increased mob spawns, special quests
}

private void adjustMobSpawning(int phase) {
    // Adjust mob spawn rates based on moon phase
    // Full moon might increase hostile mob spawns
    // New moon might decrease visibility-dependent spawns
}

private void updateAmbientLighting(int phase) {
    // Adjust night-time ambient lighting based on moon brightness
}
```

## When This Event Fires

The `MoonPhaseChangeEvent` is dispatched when:

1. The game's time system transitions to a new day/night cycle
2. The moon phase naturally progresses as part of the lunar cycle
3. Administrative commands force a moon phase change
4. World time is modified significantly, causing a phase skip

The event fires **after** the moon phase has changed, allowing handlers to react to the new state.

## Gameplay Applications

Moon phases can affect various gameplay systems:

### Mob Behavior
- Hostile mob spawn rates may increase during full moons
- Certain creatures may only appear during specific phases
- Mob aggression or behavior patterns may change

### Environmental Effects
- Night-time brightness varies with moon phase
- Visual effects like moonlight intensity
- Weather patterns might be influenced

### Game Mechanics
- Crafting recipes that require specific moon phases
- Quests or events tied to lunar cycles
- Resource gathering affected by moon phase

### Player Effects
- Buffs or debuffs based on moon phase
- Visibility changes during different phases
- Sleep mechanics potentially affected

## Related Events

- [ChunkPreLoadProcessEvent](./chunk-pre-load-process-event.md) - Fired when a chunk is being loaded
- [ChunkSaveEvent](./chunk-save-event.md) - Fired when a chunk is being saved
- [ChunkUnloadEvent](./chunk-unload-event.md) - Fired when a chunk is being unloaded

## Common Use Cases

### Full Moon Special Events

```java
ecsEventManager.register(MoonPhaseChangeEvent.class, event -> {
    if (event.getNewMoonPhase() == FULL_MOON) {
        // Start full moon event
        startFullMoonEvent();
        broadcastMessage("The full moon rises... beware the creatures of the night!");
    }
});
```

### Mob Spawn Multiplier

```java
ecsEventManager.register(MoonPhaseChangeEvent.class, event -> {
    int phase = event.getNewMoonPhase();

    // Calculate spawn multiplier based on moon brightness
    double multiplier = calculateMoonBrightness(phase);
    mobSpawner.setSpawnMultiplier(multiplier);
});

private double calculateMoonBrightness(int phase) {
    // Full moon (phase 4) = 1.0, New moon (phase 0) = 0.0
    return Math.cos((phase * Math.PI) / 4.0) * 0.5 + 0.5;
}
```

### Lunar Calendar System

```java
ecsEventManager.register(MoonPhaseChangeEvent.class, event -> {
    int phase = event.getNewMoonPhase();

    // Track lunar calendar for time-based features
    lunarCalendar.advancePhase(phase);

    // Notify players of the new phase
    for (Player player : getOnlinePlayers()) {
        player.sendMessage("The moon enters its " + getMoonPhaseName(phase) + " phase.");
    }
});
```

### Achievement/Quest Triggers

```java
ecsEventManager.register(MoonPhaseChangeEvent.class, event -> {
    int phase = event.getNewMoonPhase();

    // Check for phase-specific achievements
    for (Player player : getOnlinePlayers()) {
        checkMoonPhaseAchievements(player, phase);
        updateMoonPhaseQuests(player, phase);
    }
});
```

## Source Reference

- **Event Definition:** `decompiled/com/hypixel/hytale/server/core/universe/world/events/ecs/MoonPhaseChangeEvent.java`
- **EcsEvent Base:** `decompiled/com/hypixel/hytale/component/system/EcsEvent.java`
