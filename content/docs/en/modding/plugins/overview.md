---
id: overview
title: Java Plugins Overview
sidebar_label: Overview
sidebar_position: 1
description: Develop Java plugins for Hytale servers
---

# Java Plugins Overview

Java plugins provide the most powerful way to extend Hytale servers. According to the official [Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status), server plugins are "the most powerful modding option."

## What Are Plugins?

Plugins are Java `.jar` files that:
- Hook into the server API
- Handle events and game logic
- Add custom commands
- Implement complex game mechanics

> "Server plugins are Java-based (.jar files). If you've worked with Bukkit, Spigot, or Paper plugins for Minecraft, that experience will transfer."
> — [Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

## Requirements

| Requirement | Version |
|-------------|---------|
| Java | **Java 25** |
| Gradle | **9.2.0** |
| IDE | IntelliJ IDEA (recommended) |

## Similarity to Bukkit/Spigot

If you've developed Minecraft plugins, Hytale plugins will feel familiar:

```java
@PluginInfo(name = "MyPlugin", version = "1.0.0")
public class MyPlugin extends Plugin {

    @Override
    public void onEnable() {
        getLogger().info("Plugin enabled!");
        registerCommand("hello", new HelloCommand());
    }

    @Override
    public void onDisable() {
        getLogger().info("Plugin disabled!");
    }
}
```

## Plugin Types

### Standard Plugins

- Use the public API
- Safe and stable
- Recommended for most use cases

### Bootstrap Plugins

- Early loading
- Low-level access
- For advanced modifications

## Getting Started

1. [Project Setup](/docs/modding/plugins/project-setup)
2. [Plugin Lifecycle](/docs/modding/plugins/plugin-lifecycle)
3. [Events](/docs/modding/plugins/events)
4. [Commands](/docs/modding/plugins/commands)

## Server Source Code

The development team is committed to releasing the server source code **1-2 months after launch**, enabling deeper understanding of the API and community contributions.

> "We are committed to releasing the server's source code as soon as we are legally authorized to do so."
> — [Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

### Benefits of Open Source

- Inspect how systems work under the hood
- Unblock yourself by reading the actual implementation
- Contribute improvements and bug fixes back

:::info Decompilation Available Now
Until the source code is released, the server JAR is **not obfuscated** and can be easily decompiled. This allows you to explore the API while official documentation catches up.
:::

## Visual Scripting Alternative

For non-programmers, Hytale is developing a **Visual Scripting system** inspired by Unreal Engine Blueprints:

- Create game logic through a node-based interface
- No coding required
- Programmers can create custom nodes in Java that designers can use

[Learn more about Visual Scripting →](/docs/modding/overview#4-visual-scripting-coming-soon)
