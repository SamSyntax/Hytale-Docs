---
id: events
title: Système d'Événements
sidebar_label: Événements
sidebar_position: 4
---

# Système d'Événements

Réagissez aux événements du jeu dans vos plugins.

## Enregistrer des Événements

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    player.sendMessage("Bienvenue !");
}
```

## Événements Courants

| Événement | Déclencheur |
|-----------|-------------|
| `PlayerJoinEvent` | Un joueur se connecte |
| `PlayerQuitEvent` | Un joueur se déconnecte |
| `BlockBreakEvent` | Un bloc est miné |
| `EntityDamageEvent` | Une entité subit des dégâts |
