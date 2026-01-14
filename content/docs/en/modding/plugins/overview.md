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
- Register custom blocks, entities, and assets
- Implement complex game mechanics

> "Server plugins are Java-based (.jar files). If you've worked with Bukkit, Spigot, or Paper plugins for Minecraft, that experience will transfer."
> — [Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

## Requirements

| Requirement | Version |
|-------------|---------|
| Java | **Java 25** |
| Gradle | **9.2.0** |
| IDE | IntelliJ IDEA (recommended) |

## Plugin Architecture

### Core Classes

Hytale uses a two-level class hierarchy for plugins:

- **`PluginBase`** (`com.hypixel.hytale.server.core.plugin.PluginBase`) - The abstract base class that all plugins inherit from. Implements `CommandOwner` and provides core functionality like registries and lifecycle methods.

- **`JavaPlugin`** (`com.hypixel.hytale.server.core.plugin.JavaPlugin`) - Extends `PluginBase` and is the class you extend when creating a plugin. It adds JAR file handling and class loader management.

### Basic Plugin Structure

Here is a minimal plugin that extends `JavaPlugin`:

```java
package com.example.myplugin;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import javax.annotation.Nonnull;

public class MyPlugin extends JavaPlugin {

    public MyPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        getLogger().info("Plugin is setting up!");
        // Register commands, events, assets here
    }

    @Override
    protected void start() {
        getLogger().info("Plugin started!");
    }

    @Override
    protected void shutdown() {
        getLogger().info("Plugin shutting down!");
    }
}
```

**Important:** Your plugin must have a constructor that accepts `JavaPluginInit` as its only parameter. The server uses reflection to instantiate your plugin with this initialization object.

## The manifest.json File

Every plugin requires a `manifest.json` file at the root of your JAR. This file defines your plugin's metadata and dependencies.

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `Name` | String | Plugin name identifier (required) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `Group` | String | Plugin group/namespace |
| `Version` | String | Semantic version (e.g., "1.0.0") |
| `Description` | String | Plugin description |
| `Main` | String | Fully qualified main class name |
| `Authors` | AuthorInfo[] | Array of author information |
| `Website` | String | Plugin website URL |
| `ServerVersion` | String | Compatible server version range |
| `Dependencies` | Map | Required plugin dependencies |
| `OptionalDependencies` | Map | Optional plugin dependencies |
| `LoadBefore` | Map | Plugins that should load after this one |
| `DisabledByDefault` | boolean | Whether plugin is disabled by default |
| `IncludesAssetPack` | boolean | Whether plugin includes an asset pack |
| `SubPlugins` | PluginManifest[] | Nested sub-plugin manifests |

### Example manifest.json

```json
{
    "Group": "com.example",
    "Name": "MyPlugin",
    "Version": "1.0.0",
    "Description": "An example Hytale plugin",
    "Main": "com.example.myplugin.MyPlugin",
    "Authors": [
        {
            "Name": "Your Name",
            "Email": "you@example.com",
            "Url": "https://example.com"
        }
    ],
    "ServerVersion": ">=1.0.0",
    "Dependencies": {
        "Hytale:SomeOtherPlugin": ">=2.0.0"
    }
}
```

### Plugin Identifiers

Plugins are identified using a `Group:Name` format. For example: `Hytale:BlockSpawnerPlugin`. This identifier is used when specifying dependencies.

## Plugin Lifecycle

Plugins go through a series of states managed by the `PluginManager`. Understanding these states is crucial for proper resource management.

### Plugin States

| State | Description |
|-------|-------------|
| `NONE` | Initial state before any lifecycle method is called |
| `SETUP` | During `setup()` method execution |
| `START` | During `start()` method execution |
| `ENABLED` | Plugin is fully operational |
| `SHUTDOWN` | During `shutdown()` method execution |
| `DISABLED` | Plugin is disabled or failed to initialize |

### Lifecycle Methods

#### preLoad()

```java
@Nullable
public CompletableFuture<Void> preLoad()
```

Called before setup to preload configurations asynchronously. Returns a `CompletableFuture` that completes when all configs are loaded. You typically don't need to override this.

#### setup()

```java
protected void setup()
```

Called during plugin initialization. This is where you register commands, events, assets, and components. All registration should happen here.

#### start()

```java
protected void start()
```

Called after all plugins have completed `setup()`. Use this for logic that depends on other plugins being initialized.

#### shutdown()

```java
protected void shutdown()
```

Called when the plugin is shutting down. Perform cleanup before registries are cleaned up.

### Loading Process

The `PluginManager` loads plugins through these phases:

1. **Discovery** - Plugins are discovered from the `mods` directory, classpath, and builtin plugins
2. **Dependency Validation** - Dependencies are validated against loaded plugins and server version
3. **Load Order Calculation** - Plugins are sorted based on dependencies and `LoadBefore` declarations
4. **Instantiation** - Main class is loaded and constructor is invoked with `JavaPluginInit`
5. **PreLoad** - `preLoad()` is called to load configs asynchronously
6. **Setup** - `setup()` is called to register commands, events, assets
7. **Start** - `start()` is called after all plugins are set up

## Available Registries

`PluginBase` provides access to multiple registries for extending the server:

### Command Registry

```java
@Nonnull
public CommandRegistry getCommandRegistry()
```

Register commands that players and the console can execute:

```java
@Override
protected void setup() {
    getCommandRegistry().registerCommand(new MyCommand());
}
```

### Event Registry

```java
@Nonnull
public EventRegistry getEventRegistry()
```

Listen to and respond to game events:

```java
@Override
protected void setup() {
    getEventRegistry().register(PlayerJoinEvent.class, this::onPlayerJoin);

    // With priority
    getEventRegistry().register(EventPriority.EARLY, SomeEvent.class, this::handleEarly);

    // Global listener (receives all events of that type)
    getEventRegistry().registerGlobal(ChunkPreLoadProcessEvent.class, this::onChunkPreLoad);
}
```

### Asset Registry

```java
@Nonnull
public AssetRegistry getAssetRegistry()
```

Register custom assets like textures, models, and sounds.

### Block State Registry

```java
@Nonnull
public BlockStateRegistry getBlockStateRegistry()
```

Register custom block states.

### Entity Registry

```java
@Nonnull
public EntityRegistry getEntityRegistry()
```

Register custom entity types.

### Task Registry

```java
@Nonnull
public TaskRegistry getTaskRegistry()
```

Schedule recurring or delayed tasks.

### Component Registries

```java
@Nonnull
public ComponentRegistryProxy<ChunkStore> getChunkStoreRegistry()

@Nonnull
public ComponentRegistryProxy<EntityStore> getEntityStoreRegistry()
```

Register custom components for chunks and entities.

### Client Feature Registry

```java
@Nonnull
public ClientFeatureRegistry getClientFeatureRegistry()
```

Register features that affect client behavior.

## Utility Methods

### Logger Access

```java
@Nonnull
public HytaleLogger getLogger()
```

Get a logger instance for your plugin:

```java
getLogger().info("Something happened");
getLogger().warn("This might be a problem");
getLogger().error("Something went wrong", exception);
```

### Data Directory

```java
@Nonnull
public Path getDataDirectory()
```

Get the path to your plugin's data folder for storing configuration and data files.

### Plugin Information

```java
@Nonnull
public PluginIdentifier getIdentifier()

@Nonnull
public PluginManifest getManifest()
```

Access your plugin's identifier and manifest information.

### Configuration

```java
@Nonnull
protected final <T> Config<T> withConfig(@Nonnull BuilderCodec<T> configCodec)

@Nonnull
protected final <T> Config<T> withConfig(@Nonnull String name, @Nonnull BuilderCodec<T> configCodec)
```

Register configuration files that are automatically loaded during `preLoad()`. Must be called before `setup()`.

## Real Plugin Examples

Here are examples from Hytale's builtin plugins:

### BlockSpawnerPlugin

Handles block spawner mechanics:

```java
public class BlockSpawnerPlugin extends JavaPlugin {
    private static BlockSpawnerPlugin INSTANCE;
    private ComponentType<ChunkStore, BlockSpawner> blockSpawnerComponentType;

    public static BlockSpawnerPlugin get() {
        return INSTANCE;
    }

    public BlockSpawnerPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        INSTANCE = this;
    }
}
```

### BlockTickPlugin

Manages block ticking for growth and state changes:

```java
public class BlockTickPlugin extends JavaPlugin implements IBlockTickProvider {
    private static BlockTickPlugin instance;

    public BlockTickPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        instance = this;
    }

    @Override
    protected void setup() {
        // Register tick procedures
        TickProcedure.CODEC.register("BasicChance",
            BasicChanceBlockGrowthProcedure.class,
            BasicChanceBlockGrowthProcedure.CODEC);

        // Register event listeners
        this.getEventRegistry().registerGlobal(
            EventPriority.EARLY,
            ChunkPreLoadProcessEvent.class,
            this::discoverTickingBlocks);

        // Register systems
        ChunkStore.REGISTRY.registerSystem(new ChunkBlockTickSystem.PreTick());
        ChunkStore.REGISTRY.registerSystem(new ChunkBlockTickSystem.Ticking());
    }
}
```

### BlockPhysicsPlugin

Handles block physics simulation:

```java
public class BlockPhysicsPlugin extends JavaPlugin {
    public BlockPhysicsPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        this.getEventRegistry().register(LoadAssetEvent.class, BlockPhysicsPlugin::validatePrefabs);
        this.getChunkStoreRegistry().registerSystem(new BlockPhysicsSystems.Ticking());
    }
}
```

## Plugin Installation

Place your compiled `.jar` file in the `mods` directory of your server. The `PluginManager` automatically discovers and loads plugins from this location.

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
