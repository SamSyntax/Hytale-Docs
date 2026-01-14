---
id: overview
title: Apercu des Plugins Java
sidebar_label: Apercu
sidebar_position: 1
description: Developpez des plugins Java pour les serveurs Hytale
---

# Apercu des Plugins Java

Les plugins Java offrent le moyen le plus puissant d'etendre les serveurs Hytale. Selon la [Strategie de Modding](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status) officielle, les plugins serveur sont "l'option de modding la plus puissante."

## Qu'est-ce qu'un Plugin ?

Les plugins sont des fichiers Java `.jar` qui :
- Se connectent a l'API du serveur
- Gerent les evenements et la logique du jeu
- Ajoutent des commandes personnalisees
- Enregistrent des blocs, entites et assets personnalises
- Implementent des mecaniques de jeu complexes

> "Les plugins serveur sont bases sur Java (fichiers .jar). Si vous avez travaille avec des plugins Bukkit, Spigot ou Paper pour Minecraft, cette experience sera transferable."
> — [Strategie de Modding Hytale](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

## Prerequis

| Prerequis | Version |
|-----------|---------|
| Java | **Java 25** |
| Gradle | **9.2.0** |
| IDE | IntelliJ IDEA (recommande) |

## Architecture des Plugins

### Classes Principales

Hytale utilise une hierarchie de classes a deux niveaux pour les plugins :

- **`PluginBase`** (`com.hypixel.hytale.server.core.plugin.PluginBase`) - La classe de base abstraite dont tous les plugins heritent. Implemente `CommandOwner` et fournit les fonctionnalites de base comme les registres et les methodes de cycle de vie.

- **`JavaPlugin`** (`com.hypixel.hytale.server.core.plugin.JavaPlugin`) - Etend `PluginBase` et est la classe que vous etendez lors de la creation d'un plugin. Elle ajoute la gestion des fichiers JAR et du class loader.

### Structure de Base d'un Plugin

Voici un plugin minimal qui etend `JavaPlugin` :

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
        getLogger().info("Le plugin est en cours d'initialisation !");
        // Enregistrez les commandes, evenements, assets ici
    }

    @Override
    protected void start() {
        getLogger().info("Plugin demarre !");
    }

    @Override
    protected void shutdown() {
        getLogger().info("Arret du plugin !");
    }
}
```

**Important :** Votre plugin doit avoir un constructeur qui accepte `JavaPluginInit` comme seul parametre. Le serveur utilise la reflexion pour instancier votre plugin avec cet objet d'initialisation.

## Le Fichier manifest.json

Chaque plugin necessite un fichier `manifest.json` a la racine de votre JAR. Ce fichier definit les metadonnees et les dependances de votre plugin.

### Champs Obligatoires

| Champ | Type | Description |
|-------|------|-------------|
| `Name` | String | Identifiant du nom du plugin (obligatoire) |

### Champs Optionnels

| Champ | Type | Description |
|-------|------|-------------|
| `Group` | String | Groupe/namespace du plugin |
| `Version` | String | Version semantique (ex: "1.0.0") |
| `Description` | String | Description du plugin |
| `Main` | String | Nom complet de la classe principale |
| `Authors` | AuthorInfo[] | Tableau d'informations sur les auteurs |
| `Website` | String | URL du site web du plugin |
| `ServerVersion` | String | Plage de versions serveur compatibles |
| `Dependencies` | Map | Dependances de plugins requises |
| `OptionalDependencies` | Map | Dependances de plugins optionnelles |
| `LoadBefore` | Map | Plugins qui doivent se charger apres celui-ci |
| `DisabledByDefault` | boolean | Si le plugin est desactive par defaut |
| `IncludesAssetPack` | boolean | Si le plugin inclut un pack d'assets |
| `SubPlugins` | PluginManifest[] | Manifestes de sous-plugins imbriques |

### Exemple de manifest.json

```json
{
    "Group": "com.example",
    "Name": "MyPlugin",
    "Version": "1.0.0",
    "Description": "Un exemple de plugin Hytale",
    "Main": "com.example.myplugin.MyPlugin",
    "Authors": [
        {
            "Name": "Votre Nom",
            "Email": "vous@example.com",
            "Url": "https://example.com"
        }
    ],
    "ServerVersion": ">=1.0.0",
    "Dependencies": {
        "Hytale:SomeOtherPlugin": ">=2.0.0"
    }
}
```

### Identifiants de Plugin

Les plugins sont identifies en utilisant le format `Group:Name`. Par exemple : `Hytale:BlockSpawnerPlugin`. Cet identifiant est utilise lors de la specification des dependances.

## Cycle de Vie du Plugin

Les plugins passent par une serie d'etats geres par le `PluginManager`. Comprendre ces etats est crucial pour une bonne gestion des ressources.

### Etats du Plugin

| Etat | Description |
|------|-------------|
| `NONE` | Etat initial avant l'appel de toute methode de cycle de vie |
| `SETUP` | Pendant l'execution de la methode `setup()` |
| `START` | Pendant l'execution de la methode `start()` |
| `ENABLED` | Le plugin est pleinement operationnel |
| `SHUTDOWN` | Pendant l'execution de la methode `shutdown()` |
| `DISABLED` | Le plugin est desactive ou n'a pas reussi a s'initialiser |

### Methodes du Cycle de Vie

#### preLoad()

```java
@Nullable
public CompletableFuture<Void> preLoad()
```

Appelee avant setup pour precharger les configurations de maniere asynchrone. Retourne un `CompletableFuture` qui se complete lorsque toutes les configurations sont chargees. Vous n'avez generalement pas besoin de surcharger cette methode.

#### setup()

```java
protected void setup()
```

Appelee pendant l'initialisation du plugin. C'est ici que vous enregistrez les commandes, evenements, assets et composants. Tout l'enregistrement doit se faire ici.

#### start()

```java
protected void start()
```

Appelee apres que tous les plugins ont termine `setup()`. Utilisez cette methode pour la logique qui depend de l'initialisation d'autres plugins.

#### shutdown()

```java
protected void shutdown()
```

Appelee lorsque le plugin s'arrete. Effectuez le nettoyage avant que les registres ne soient nettoyes.

### Processus de Chargement

Le `PluginManager` charge les plugins a travers ces phases :

1. **Decouverte** - Les plugins sont decouverts depuis le repertoire `mods`, le classpath et les plugins integres
2. **Validation des Dependances** - Les dependances sont validees par rapport aux plugins charges et a la version du serveur
3. **Calcul de l'Ordre de Chargement** - Les plugins sont tries selon les dependances et les declarations `LoadBefore`
4. **Instanciation** - La classe principale est chargee et le constructeur est invoque avec `JavaPluginInit`
5. **PreLoad** - `preLoad()` est appelee pour charger les configurations de maniere asynchrone
6. **Setup** - `setup()` est appelee pour enregistrer les commandes, evenements, assets
7. **Start** - `start()` est appelee apres que tous les plugins sont configures

## Registres Disponibles

`PluginBase` fournit l'acces a plusieurs registres pour etendre le serveur :

### Registre de Commandes

```java
@Nonnull
public CommandRegistry getCommandRegistry()
```

Enregistrez des commandes que les joueurs et la console peuvent executer :

```java
@Override
protected void setup() {
    getCommandRegistry().registerCommand(new MyCommand());
}
```

### Registre d'Evenements

```java
@Nonnull
public EventRegistry getEventRegistry()
```

Ecoutez et reagissez aux evenements du jeu :

```java
@Override
protected void setup() {
    getEventRegistry().register(PlayerJoinEvent.class, this::onPlayerJoin);

    // Avec priorite
    getEventRegistry().register(EventPriority.EARLY, SomeEvent.class, this::handleEarly);

    // Ecouteur global (recoit tous les evenements de ce type)
    getEventRegistry().registerGlobal(ChunkPreLoadProcessEvent.class, this::onChunkPreLoad);
}
```

### Registre d'Assets

```java
@Nonnull
public AssetRegistry getAssetRegistry()
```

Enregistrez des assets personnalises comme des textures, modeles et sons.

### Registre d'Etats de Blocs

```java
@Nonnull
public BlockStateRegistry getBlockStateRegistry()
```

Enregistrez des etats de blocs personnalises.

### Registre d'Entites

```java
@Nonnull
public EntityRegistry getEntityRegistry()
```

Enregistrez des types d'entites personnalises.

### Registre de Taches

```java
@Nonnull
public TaskRegistry getTaskRegistry()
```

Planifiez des taches recurrentes ou differees.

### Registres de Composants

```java
@Nonnull
public ComponentRegistryProxy<ChunkStore> getChunkStoreRegistry()

@Nonnull
public ComponentRegistryProxy<EntityStore> getEntityStoreRegistry()
```

Enregistrez des composants personnalises pour les chunks et les entites.

### Registre de Fonctionnalites Client

```java
@Nonnull
public ClientFeatureRegistry getClientFeatureRegistry()
```

Enregistrez des fonctionnalites qui affectent le comportement du client.

## Methodes Utilitaires

### Acces au Logger

```java
@Nonnull
public HytaleLogger getLogger()
```

Obtenez une instance de logger pour votre plugin :

```java
getLogger().info("Quelque chose s'est produit");
getLogger().warn("Ceci pourrait etre un probleme");
getLogger().error("Quelque chose s'est mal passe", exception);
```

### Repertoire de Donnees

```java
@Nonnull
public Path getDataDirectory()
```

Obtenez le chemin vers le dossier de donnees de votre plugin pour stocker les fichiers de configuration et de donnees.

### Informations du Plugin

```java
@Nonnull
public PluginIdentifier getIdentifier()

@Nonnull
public PluginManifest getManifest()
```

Accedez a l'identifiant et aux informations du manifeste de votre plugin.

### Configuration

```java
@Nonnull
protected final <T> Config<T> withConfig(@Nonnull BuilderCodec<T> configCodec)

@Nonnull
protected final <T> Config<T> withConfig(@Nonnull String name, @Nonnull BuilderCodec<T> configCodec)
```

Enregistrez des fichiers de configuration qui sont automatiquement charges pendant `preLoad()`. Doit etre appele avant `setup()`.

## Exemples Reels de Plugins

Voici des exemples issus des plugins integres de Hytale :

### BlockSpawnerPlugin

Gere les mecaniques de generateurs de blocs :

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

Gere le ticking des blocs pour la croissance et les changements d'etat :

```java
public class BlockTickPlugin extends JavaPlugin implements IBlockTickProvider {
    private static BlockTickPlugin instance;

    public BlockTickPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        instance = this;
    }

    @Override
    protected void setup() {
        // Enregistrer les procedures de tick
        TickProcedure.CODEC.register("BasicChance",
            BasicChanceBlockGrowthProcedure.class,
            BasicChanceBlockGrowthProcedure.CODEC);

        // Enregistrer les ecouteurs d'evenements
        this.getEventRegistry().registerGlobal(
            EventPriority.EARLY,
            ChunkPreLoadProcessEvent.class,
            this::discoverTickingBlocks);

        // Enregistrer les systemes
        ChunkStore.REGISTRY.registerSystem(new ChunkBlockTickSystem.PreTick());
        ChunkStore.REGISTRY.registerSystem(new ChunkBlockTickSystem.Ticking());
    }
}
```

### BlockPhysicsPlugin

Gere la simulation physique des blocs :

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

## Installation des Plugins

Placez votre fichier `.jar` compile dans le repertoire `mods` de votre serveur. Le `PluginManager` decouvre et charge automatiquement les plugins depuis cet emplacement.

## Pour Commencer

1. [Configuration du Projet](/docs/modding/plugins/project-setup)
2. [Cycle de Vie du Plugin](/docs/modding/plugins/plugin-lifecycle)
3. [Evenements](/docs/modding/plugins/events)
4. [Commandes](/docs/modding/plugins/commands)

## Code Source du Serveur

L'equipe de developpement s'est engagee a publier le code source du serveur **1 a 2 mois apres le lancement**, permettant une comprehension plus approfondie de l'API et des contributions de la communaute.

> "Nous nous engageons a publier le code source du serveur des que nous y serons legalement autorises."
> — [Strategie de Modding Hytale](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

### Avantages de l'Open Source

- Inspecter le fonctionnement interne des systemes
- Se debloquer en lisant l'implementation reelle
- Contribuer des ameliorations et corrections de bugs

:::info Decompilation Disponible Maintenant
Jusqu'a la publication du code source, le JAR du serveur n'est **pas obfusque** et peut etre facilement decompile. Cela vous permet d'explorer l'API en attendant que la documentation officielle rattrape son retard.
:::

## Alternative de Visual Scripting

Pour les non-programmeurs, Hytale developpe un systeme de **Visual Scripting** inspire des Blueprints d'Unreal Engine :

- Creez de la logique de jeu via une interface basee sur des noeuds
- Aucun codage requis
- Les programmeurs peuvent creer des noeuds personnalises en Java que les designers peuvent utiliser

[En savoir plus sur le Visual Scripting →](/docs/modding/overview#4-visual-scripting-coming-soon)
