---
id: plugin-lifecycle
title: Plugin Lifecycle
sidebar_label: Lifecycle
sidebar_position: 3
---

# Plugin Lifecycle

Understanding when your plugin code executes.

## Lifecycle Methods

```java
public class MyPlugin extends Plugin {

    @Override
    public void onLoad() {
        // Called when plugin is loaded
    }

    @Override
    public void onEnable() {
        // Called when plugin is enabled
    }

    @Override
    public void onDisable() {
        // Called on shutdown
    }
}
```

## Execution Order

1. `onLoad()` - All plugins loaded
2. `onEnable()` - Plugins enabled
3. Server runs...
4. `onDisable()` - Server shutting down
