---
id: all-worlds-loaded-event
title: AllWorldsLoadedEvent
sidebar_label: AllWorldsLoadedEvent
description: Evenement déclenché lorsque tous les mondes configures ont ete charges
---

# AllWorldsLoadedEvent

L'événement `AllWorldsLoadedEvent` est déclenché une fois que tous les mondes configures ont ete charges pendant le demarrage du serveur. Cet événement signale que la phase d'initialisation des mondes du serveur est terminee et que tous les mondes sont prets a etre utilises.

## Informations sur l'événement

| Propriété | Valeur |
|-----------|--------|
| **Nom complet de la classe** | `com.hypixel.hytale.server.core.universe.world.events.AllWorldsLoadedEvent` |
| **Classe parente** | `IEvent<Void>` |
| **Annulable** | Non |
| **Fichier source** | `decompiled/com/hypixel/hytale/server/core/universe/world/events/AllWorldsLoadedEvent.java:6` |

## Declaration

```java
public class AllWorldsLoadedEvent implements IEvent<Void> {
   public AllWorldsLoadedEvent() {
   }
}
```

## Champs

Cet événement ne definit aucun champ. Il sert d'événement signal pour indiquer que tous les mondes ont ete charges.

## Méthodes

Cet événement ne definit aucune methode au-dela de celles héritées de `IEvent<Void>`.

## Exemple d'utilisation

```java
import com.hypixel.hytale.server.core.universe.world.events.AllWorldsLoadedEvent;
import com.hypixel.hytale.event.EventPriority;

// Enregistrer un listener pour effectuer des actions apres le chargement de tous les mondes
eventBus.register(EventPriority.NORMAL, AllWorldsLoadedEvent.class, event -> {
    System.out.println("Tous les mondes ont ete charges !");

    // Exemple : Effectuer une initialisation inter-mondes
    initializeCrossWorldFeatures();

    // Exemple : Commencer a accepter les connexions des joueurs
    enablePlayerConnections();

    // Exemple : Initialiser les portails/liens entre mondes
    setupWorldPortals();

    // Exemple : Demarrer les taches planifiees qui dependent de tous les mondes
    startGlobalScheduledTasks();
});

private void initializeCrossWorldFeatures() {
    // Configurer les fonctionnalites qui s'etendent sur plusieurs mondes
    // Comme les inventaires partages, la teleportation inter-mondes, etc.
}

private void enablePlayerConnections() {
    // Maintenant que tous les mondes sont charges, autoriser les joueurs a se connecter
    // Cela garantit que les joueurs ne seront pas envoyes vers des mondes qui n'existent pas encore
}

private void setupWorldPortals() {
    // Configurer les portails entre les mondes
    // Cela necessite que tous les mondes de destination soient charges d'abord
}

private void startGlobalScheduledTasks() {
    // Demarrer les taches qui operent sur tous les mondes
    // Comme les événements globaux, l'apparition de mobs inter-mondes, etc.
}
```

## Quand cet événement se déclenché

L'événement `AllWorldsLoadedEvent` est dispatche lorsque :

1. Le serveur a fini de charger tous les mondes configures dans les parametres du serveur
2. Tous les événements `AddWorldEvent` et `StartWorldEvent` ont ete traites pour les mondes initiaux
3. Le serveur est pret a proceder a l'initialisation post-chargement des mondes

Cet événement se déclenché **exactement une fois** pendant le demarrage du serveur, apres que la phase de chargement des mondes est terminee.

## Cycle de vie de l'événement

Le cycle de vie typique du demarrage du serveur impliquant les événements de monde :

1. `BootEvent` - Le serveur demarre
2. `AddWorldEvent` (par monde) - Chaque monde configure est en cours d'ajout
3. `StartWorldEvent` (par monde) - Chaque monde a demarre
4. **`AllWorldsLoadedEvent`** - Tous les mondes sont maintenant charges
5. Le serveur continue avec les taches de demarrage restantes

## Notes importantes

- Cet événement se déclenché une seule fois pendant le demarrage du serveur
- Il ne se déclenché pas lorsque des mondes sont ajoutes dynamiquement apres le demarrage
- Utilisez cet événement pour l'initialisation qui necessite que tous les mondes soient disponibles
- C'est l'endroit ideal pour configurer les fonctionnalites inter-mondes

## Événements associes

- [AddWorldEvent](./add-world-event.md) - Déclenché pour chaque monde en cours d'ajout
- [StartWorldEvent](./start-world-event.md) - Déclenché lorsque chaque monde demarre
- [RemoveWorldEvent](./remove-world-event.md) - Déclenché lorsqu'un monde est en cours de suppression
- [BootEvent](/docs/modding/plugins/events/server/boot-event) - Déclenché lorsque le serveur commence a demarrer

## Cas d'utilisation courants

### Initialisation des systemes inter-mondes

```java
eventBus.register(AllWorldsLoadedEvent.class, event -> {
    // Initialiser les systemes qui dependent de plusieurs mondes
    WorldLinkManager.initialize();
    CrossWorldEconomy.setup();
    GlobalLeaderboard.load();
});
```

### Annonce de serveur pret

```java
eventBus.register(EventPriority.LAST, AllWorldsLoadedEvent.class, event -> {
    // Annoncer que le serveur est pret
    logger.info("Initialisation du serveur terminee - tous les mondes charges");

    // Activer le listener du serveur pour les connexions des joueurs
    server.setAcceptingConnections(true);

    // Notifier les systemes externes (bots Discord, surveillance, etc.)
    notifyExternalSystems("Le serveur est pret");
});
```

### Validation des mondes

```java
eventBus.register(EventPriority.FIRST, AllWorldsLoadedEvent.class, event -> {
    // Valider que les mondes requis sont presents
    List<String> requiredWorlds = Arrays.asList("spawn", "hub", "survival");

    for (String worldName : requiredWorlds) {
        if (!worldManager.worldExists(worldName)) {
            logger.error("Le monde requis '{}' n'a pas ete charge !", worldName);
            // Prendre l'action appropriee
        }
    }
});
```

### Metriques de performance

```java
eventBus.register(AllWorldsLoadedEvent.class, event -> {
    long loadTime = System.currentTimeMillis() - serverStartTime;

    metrics.recordWorldLoadTime(loadTime);
    logger.info("Tous les mondes charges en {} ms", loadTime);

    // Enregistrer les statistiques individuelles des mondes
    for (World world : worldManager.getWorlds()) {
        metrics.recordWorldStats(world.getName(), world.getLoadedChunkCount());
    }
});
```

## Référence source

- **Definition de l'événement :** `decompiled/com/hypixel/hytale/server/core/universe/world/events/AllWorldsLoadedEvent.java`
- **Interface IEvent :** `decompiled/com/hypixel/hytale/event/IEvent.java`
