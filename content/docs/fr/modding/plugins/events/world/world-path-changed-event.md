---
id: world-path-changed-event
title: WorldPathChangedEvent
sidebar_label: WorldPathChangedEvent
---

# WorldPathChangedEvent

Declenche lorsque la configuration du chemin du monde change. Cet evenement est utile pour suivre les mises a jour des chemins de navigation et les changements de structure du monde qui affectent la facon dont les entites naviguent dans le monde.

## Informations sur l'evenement

| Propriete | Valeur |
|-----------|--------|
| **Nom complet de la classe** | `com.hypixel.hytale.server.core.universe.world.path.WorldPathChangedEvent` |
| **Classe parente** | `IEvent<Void>` |
| **Annulable** | Non |
| **Asynchrone** | Non |
| **Fichier source** | `decompiled/com/hypixel/hytale/server/core/universe/world/path/WorldPathChangedEvent.java` |

## Declaration

```java
public class WorldPathChangedEvent implements IEvent<Void> {
   private WorldPath worldPath;

   public WorldPathChangedEvent(WorldPath worldPath) {
      Objects.requireNonNull(worldPath, "World path must not be null in an event");
      this.worldPath = worldPath;
   }

   public WorldPath getWorldPath() {
      return this.worldPath;
   }

   @Nonnull
   @Override
   public String toString() {
      return "WorldPathChangedEvent{worldPath=" + this.worldPath + "}";
   }
}
```

## Champs

| Champ | Type | Accesseur | Description |
|-------|------|-----------|-------------|
| `worldPath` | `WorldPath` | `getWorldPath()` | L'objet chemin du monde qui a change |

## Methodes

| Methode | Signature | Description |
|---------|-----------|-------------|
| `getWorldPath` | `public WorldPath getWorldPath()` | Retourne le chemin du monde qui a ete modifie |

## Validation

Le constructeur de l'evenement valide que :
- `worldPath` ne doit pas etre null - lance `NullPointerException` avec le message "World path must not be null in an event"

## Exemple d'utilisation

```java
import com.hypixel.hytale.server.core.universe.world.path.WorldPathChangedEvent;
import com.hypixel.hytale.server.core.universe.world.path.WorldPath;
import com.hypixel.hytale.event.EventBus;
import com.hypixel.hytale.event.EventPriority;

public class PathfindingPlugin extends PluginBase {

    @Override
    public void onEnable() {
        EventBus.register(WorldPathChangedEvent.class, this::onWorldPathChanged, EventPriority.NORMAL);
    }

    private void onWorldPathChanged(WorldPathChangedEvent event) {
        WorldPath worldPath = event.getWorldPath();

        // Reagir aux changements de chemin
        getLogger().info("Chemin du monde change: " + worldPath.toString());

        // Mettre a jour les donnees de pathfinding en cache
        invalidatePathfindingCache(worldPath);

        // Notifier les PNJ qui pourraient avoir besoin de recalculer leurs routes
        notifyAffectedEntities(worldPath);
    }

    private void invalidatePathfindingCache(WorldPath worldPath) {
        // Vider les chemins en cache qui pourraient etre affectes par le changement
    }

    private void notifyAffectedEntities(WorldPath worldPath) {
        // Mettre a jour les entites dont la navigation pourrait etre affectee
    }
}
```

## Quand cet evenement se declenche

Le `WorldPathChangedEvent` est declenche lorsque :

1. **Mises a jour de configuration de chemin** - Quand les chemins de navigation du monde sont modifies
2. **Changements de structure du monde** - Quand des changements du monde affectent les routes de pathfinding
3. **Recalcul dynamique de chemin** - Quand le jeu recalcule les chemins disponibles

L'evenement se declenche **apres** que le changement de chemin a ete applique, permettant aux gestionnaires de :
- Mettre a jour les donnees de pathfinding en cache
- Notifier les entites affectees
- Journaliser les changements de navigation
- Declencher des systemes dependants

## Comprendre WorldPath

L'objet `WorldPath` represente les informations de chemin de navigation dans le monde, qui peuvent inclure :
- Points de passage et connexions
- Donnees de maillage de navigation
- Contraintes et couts de chemin
- Informations d'accessibilite

## Cas d'utilisation

- **Pathfinding personnalise** : S'integrer avec des systemes de navigation personnalises
- **Invalidation de cache** : Vider les caches de pathfinding obsoletes
- **Comportement des PNJ** : Mettre a jour la navigation des PNJ quand les chemins changent
- **Debogage** : Suivre les changements de chemin pour le depannage
- **Analytique** : Surveiller les mises a jour de navigation du monde

## Evenements lies

- [AddWorldEvent](./add-world-event) - Declenche quand un monde est ajoute
- [StartWorldEvent](./start-world-event) - Declenche quand un monde demarre

## Reference source

`decompiled/com/hypixel/hytale/server/core/universe/world/path/WorldPathChangedEvent.java`
