---
id: introduction
title: Introduction au developpement Hytale
sidebar_label: Introduction
sidebar_position: 1
description: Commencez avec le modding et le developpement de serveurs Hytale
---

# Introduction au developpement Hytale

Bienvenue dans le developpement Hytale ! Ce guide vous aidera a comprendre les fondamentaux de la creation de contenu pour Hytale.

## Pourquoi modder Hytale ?

Hytale a ete concu des le depart avec le modding au coeur de son architecture. Contrairement a de nombreux jeux ou le modding est une reflexion apres coup, Hytale offre :

- **Support natif des mods** - Pas besoin de hacks ou de solutions de contournement
- **Execution cote serveur** - Tous les mods s'executent sur le serveur
- **Experience joueur fluide** - Les joueurs n'ont rien a telecharger
- **Outils professionnels** - Les memes outils utilises par Hypixel Studios

## Types de modifications

Hytale propose quatre categories principales de modifications :

### 1. Java Plugins

Des plugins complets ecrits en Java, similaires aux plugins Bukkit/Spigot :

```java
@PluginInfo(name = "MyPlugin", version = "1.0.0")
public class MyPlugin extends Plugin {
    @Override
    public void onEnable() {
        getLogger().info("Plugin enabled!");
    }
}
```

**Ideal pour :** Logique de jeu complexe, commandes personnalisees, systemes economiques

### 2. Data Assets (JSON)

Fichiers de configuration JSON qui definissent le contenu du jeu sans programmation :

```json
{
  "id": "my_custom_block",
  "displayName": "Ruby Block",
  "properties": {
    "hardness": 3.0,
    "resistance": 5.0
  }
}
```

**Ideal pour :** Nouveaux blocs, objets, PNJ, tables de butin

### 3. Art Assets

Modeles 3D personnalises, textures et animations :

- Modeles (`.blockymodel`)
- Animations (`.blockyanim`)
- Textures (PNG)
- Sons

**Ideal pour :** Creatures personnalisees, objets, decorations

### 4. World Content

Structures preconstruites et configurations de monde :

- Prefabs (structures reutilisables)
- Biomes personnalises
- Modifications de terrain

## Vue d'ensemble de l'architecture

```mermaid
graph TD
    A[Hytale Server] --> B[Java Plugins]
    A --> C[Data Assets]
    A --> D[Art Assets]
    A --> E[World Content]
    B --> F[Game Logic]
    C --> G[Content Definitions]
    D --> H[Visual Assets]
    E --> I[Map Data]
    J[Player Client] --> A
    K[Player Client] --> A
    L[Player Client] --> A
```

### Philosophie Server-First

Toutes les modifications dans Hytale s'executent sur le serveur :

- Les joueurs se connectent avec un client non modifie
- Le serveur diffuse tout le contenu necessaire
- Aucune installation de mod requise pour les joueurs
- Changer de serveur est transparent

## Prochaines etapes

Pret a commencer ? Suivez ces guides dans l'ordre :

1. [**Prerequis**](/docs/getting-started/prerequisites) - Ce dont vous avez besoin d'installe
2. [**Configuration de l'environnement**](/docs/getting-started/environment-setup) - Configurez vos outils de developpement
3. [**Votre premier mod**](/docs/getting-started/first-mod) - Creez un mod simple

## Ressources utiles

- [Official Hytale Blog](https://hytale.com/news)
- [HytaleModding.dev](https://hytalemodding.dev)
- [Blockbench](https://www.blockbench.net/) - Outil de modelisation 3D
- [Hytale Discord](https://discord.gg/hytale)
