---
id: plugin-lifecycle
title: Cycle de Vie du Plugin
sidebar_label: Cycle de Vie
sidebar_position: 3
---

# Cycle de Vie du Plugin

Comprendre quand le code de votre plugin s'exécute.

## Méthodes du Cycle de Vie

```java
public class MyPlugin extends Plugin {

    @Override
    public void onLoad() {
        // Appelé quand le plugin est chargé
    }

    @Override
    public void onEnable() {
        // Appelé quand le plugin est activé
    }

    @Override
    public void onDisable() {
        // Appelé à l'arrêt
    }
}
```

## Ordre d'Exécution

1. `onLoad()` - Tous les plugins chargés
2. `onEnable()` - Plugins activés
3. Le serveur tourne...
4. `onDisable()` - Serveur en cours d'arrêt
