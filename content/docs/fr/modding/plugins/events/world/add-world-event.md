---
id: add-world-event
title: AddWorldEvent
sidebar_label: AddWorldEvent
description: Evenement déclenché lors de l'ajout d'un nouveau monde au serveur
---

# AddWorldEvent

L'événement `AddWorldEvent` est déclenché lorsqu'un nouveau monde est en cours d'ajout a l'univers du serveur. Cet événement permet aux plugins d'intercepter et potentiellement d'annuler l'ajout de mondes, offrant ainsi une logique personnalisee de gestion des mondes.

## Informations sur l'événement

| Propriété | Valeur |
|-----------|--------|
| **Nom complet de la classe** | `com.hypixel.hytale.server.core.universe.world.events.AddWorldEvent` |
| **Classe parente** | `WorldEvent` |
| **Implemente** | `ICancellable` |
| **Annulable** | Oui |
| **Fichier source** | `decompiled/com/hypixel/hytale/server/core/universe/world/events/AddWorldEvent.java:7` |

## Declaration

```java
public class AddWorldEvent extends WorldEvent implements ICancellable {
   private boolean cancelled;

   public AddWorldEvent(@Nonnull World world) {
      super(world);
   }

   public boolean isCancelled() {
      return this.cancelled;
   }

   public void setCancelled(boolean cancelled) {
      this.cancelled = cancelled;
   }
}
```

## Champs

| Champ | Type | Accesseur | Description |
|-------|------|-----------|-------------|
| `cancelled` | `boolean` | `isCancelled()` | Indique si l'événement a ete annule |

## Champs herites

De `WorldEvent` :

| Champ | Type | Accesseur | Description |
|-------|------|-----------|-------------|
| `world` | `World` | `getWorld()` | Le monde en cours d'ajout au serveur |

## Méthodes

### isCancelled()

```java
public boolean isCancelled()
```

Retourne si l'événement a ete annule.

**Retourne :** `boolean` - `true` si l'ajout du monde a ete annule, `false` sinon

### setCancelled(boolean)

```java
public void setCancelled(boolean cancelled)
```

Definit si l'événement doit etre annule. Lorsqu'il est annule, le monde ne sera pas ajoute au serveur.

**Parametres :**
- `cancelled` - `true` pour annuler l'ajout du monde, `false` pour l'autoriser

### getWorld()

```java
public World getWorld()
```

Hérité de `WorldEvent`. Retourne le monde qui est en cours d'ajout.

**Retourne :** `World` - L'instance du monde en cours d'ajout au serveur

## Exemple d'utilisation

```java
import com.hypixel.hytale.server.core.universe.world.events.AddWorldEvent;
import com.hypixel.hytale.event.EventPriority;

// Enregistrer un listener pour controler les ajouts de mondes
eventBus.register(EventPriority.NORMAL, AddWorldEvent.class, event -> {
    World world = event.getWorld();

    // Exemple : Empecher l'ajout de mondes avec certains noms
    if (world.getName().startsWith("restricted_")) {
        event.setCancelled(true);
        System.out.println("Ajout bloque du monde restreint : " + world.getName());
        return;
    }

    // Journaliser les ajouts de mondes
    System.out.println("Monde en cours d'ajout : " + world.getName());
});
```

## Quand cet événement se déclenché

L'événement `AddWorldEvent` est dispatche lorsque :

1. Un nouveau monde est en cours d'enregistrement aupres du systeme d'univers du serveur
2. Pendant le demarrage du serveur lorsque les mondes configures sont charges
3. Lorsque des plugins creent et ajoutent programmatiquement de nouveaux mondes
4. Lorsque la generation dynamique de mondes cree une nouvelle instance de monde

L'événement se déclenché **avant** que le monde soit complètement ajoute a l'univers, permettant aux handlers d'annuler l'operation si necessaire.

## Comportement de l'annulation

Lorsque l'événement est annule :
- Le monde ne sera pas ajoute a la liste des mondes du serveur
- Le monde ne sera pas accessible aux joueurs ou aux autres systemes
- Les ressources associees peuvent etre nettoyees selon l'implementation

## Événements associes

- [RemoveWorldEvent](./remove-world-event.md) - Déclenché lorsqu'un monde est en cours de suppression
- [StartWorldEvent](./start-world-event.md) - Déclenché lorsqu'un monde demarre apres avoir ete ajoute
- [AllWorldsLoadedEvent](./all-worlds-loaded-event.md) - Déclenché lorsque tous les mondes configures ont ete charges

## Référence source

- **Definition de l'événement :** `decompiled/com/hypixel/hytale/server/core/universe/world/events/AddWorldEvent.java`
- **Classe parente :** `decompiled/com/hypixel/hytale/server/core/universe/world/events/WorldEvent.java`
- **Interface Cancellable :** `decompiled/com/hypixel/hytale/event/ICancellable.java`
