---
id: overview
title: Aperçu des Plugins Java
sidebar_label: Aperçu
sidebar_position: 1
description: Développer des plugins Java pour les serveurs Hytale
---

# Aperçu des Plugins Java

Les plugins Java offrent le moyen le plus puissant d'étendre les serveurs Hytale. Selon la [Stratégie de Modding](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status) officielle, les plugins serveur sont "l'option de modding la plus puissante."

## Que sont les Plugins ?

Les plugins sont des fichiers Java `.jar` qui :
- Se connectent à l'API du serveur
- Gèrent les événements et la logique de jeu
- Ajoutent des commandes personnalisées
- Implémentent des mécaniques de jeu complexes

> "Les plugins serveur sont basés sur Java (fichiers .jar). Si vous avez travaillé avec des plugins Bukkit, Spigot ou Paper pour Minecraft, cette expérience sera transférable."
> — [Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

## Prérequis

| Prérequis | Version |
|-----------|---------|
| Java | **Java 25** |
| Gradle | **9.2.0** |
| IDE | IntelliJ IDEA (recommandé) |

## Similarité avec Bukkit/Spigot

Si vous avez développé des plugins Minecraft, les plugins Hytale vous sembleront familiers :

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

## Types de Plugins

### Plugins Standard

- Utilisent l'API publique
- Sûrs et stables
- Recommandés pour la plupart des cas d'usage

### Plugins Bootstrap

- Chargement précoce
- Accès bas niveau
- Pour les modifications avancées

## Pour Commencer

1. [Configuration du Projet](/docs/modding/plugins/project-setup)
2. [Cycle de Vie du Plugin](/docs/modding/plugins/plugin-lifecycle)
3. [Événements](/docs/modding/plugins/events)
4. [Commandes](/docs/modding/plugins/commands)

## Code Source du Serveur

L'équipe de développement s'est engagée à publier le code source du serveur **1-2 mois après le lancement**, permettant une compréhension plus profonde de l'API et des contributions de la communauté.

> "Nous nous engageons à publier le code source du serveur dès que nous y serons légalement autorisés."
> — [Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

### Avantages de l'Open Source

- Inspecter comment les systèmes fonctionnent en profondeur
- Se débloquer en lisant l'implémentation réelle
- Contribuer des améliorations et corrections de bugs

:::info Décompilation Disponible Maintenant
Jusqu'à la publication du code source, le JAR du serveur n'est **pas obfusqué** et peut être facilement décompilé. Cela vous permet d'explorer l'API en attendant que la documentation officielle soit complète.
:::

## Alternative Visual Scripting

Pour les non-programmeurs, Hytale développe un système de **Visual Scripting** inspiré des Blueprints d'Unreal Engine :

- Créez de la logique de jeu via une interface basée sur des nœuds
- Pas de code requis
- Les programmeurs peuvent créer des nœuds personnalisés en Java que les designers peuvent utiliser

[En savoir plus sur le Visual Scripting →](/docs/modding/overview#4-visual-scripting-coming-soon)
