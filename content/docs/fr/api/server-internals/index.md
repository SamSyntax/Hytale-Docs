---
id: server-internals
title: Documentation Interne du Serveur Hytale
sidebar_label: Internals Serveur
sidebar_position: 10
description: Documentation technique v1 du serveur Hytale - Architecture, API, Packets et Systemes internes
---

# Documentation Interne du Serveur Hytale

<div className="version-badge">
  <span className="badge badge--warning">Version 1.0 - Documentation Experimentale</span>
</div>

:::caution Documentation v1 - En cours de developpement
Cette documentation est une **premiere version** generee par analyse du code source decompile du serveur Hytale. Elle peut contenir des inexactitudes et sera mise a jour regulierement.

**Derniere mise a jour :** 13 janvier 2026
:::

## A propos de cette documentation

Cette section documente les **mecanismes internes** du serveur Hytale, destines aux developpeurs de plugins avances souhaitant comprendre le fonctionnement en profondeur du serveur.

### Sources

- Code source decompile du serveur Hytale (version Early Access)
- Analyse automatisee avec verification manuelle
- Package principal : `com.hypixel.hytale`

---

## Architecture du Serveur

Le serveur Hytale est construit sur une architecture modulaire basee sur :

| Composant | Description |
|-----------|-------------|
| **ECS (Entity Component System)** | Systeme de gestion des entites performant |
| **EventBus** | Bus d'evenements synchrone et asynchrone |
| **PluginManager** | Gestionnaire de plugins avec cycle de vie complet |
| **Protocol QUIC** | Communication reseau via Netty + QUIC (port 5520) |

---

## Sections de la Documentation

### Systeme de Plugins

Tout ce dont vous avez besoin pour creer des plugins Java pour Hytale.

| Guide | Description |
|-------|-------------|
| [**Systeme de Plugins**](./plugins) | Architecture, cycle de vie, PluginManager |
| [**Systeme d'Evenements**](./events) | EventBus, priorites, evenements annulables |
| [**Systeme de Commandes**](./commands) | CommandManager, creation de commandes |

### Architecture Interne

Comprehension approfondie des systemes internes du serveur.

| Guide | Description |
|-------|-------------|
| [**Systeme ECS**](./ecs) | Entity Component System, Components, Queries |
| [**Types de Donnees**](./types) | BlockType, Items, EntityEffect, enums |
| [**Packets Reseau**](./packets) | Protocole, 200+ packets documentes |

---

## Statistiques de la Documentation

| Metrique | Valeur |
|----------|--------|
| Fichiers Java analyses | 5 218 |
| Packets documentes | 200+ |
| Commandes documentees | 50+ |
| Evenements documentes | 30+ |
| Composants ECS | 20+ |

---

## Informations Techniques

### Port par defaut

```
5520 (UDP - QUIC)
```

### Package principal

```
com.hypixel.hytale
```

### Classe principale

```java
com.hypixel.hytale.server.core.HytaleServer
```

---

## Pour Commencer

<div className="doc-card-grid">
  <div className="doc-card">
    <h3>Creer un Plugin</h3>
    <p>Apprenez a creer votre premier plugin Java pour Hytale.</p>
    <a href="./plugins">Voir la documentation →</a>
  </div>
  <div className="doc-card">
    <h3>Ecouter des Evenements</h3>
    <p>Reagissez aux actions des joueurs et du serveur.</p>
    <a href="./events">Voir la documentation →</a>
  </div>
  <div className="doc-card">
    <h3>Creer des Commandes</h3>
    <p>Ajoutez des commandes personnalisees a votre serveur.</p>
    <a href="./commands">Voir la documentation →</a>
  </div>
  <div className="doc-card">
    <h3>Comprendre l'ECS</h3>
    <p>Maitrisez le systeme de composants pour les entites.</p>
    <a href="./ecs">Voir la documentation →</a>
  </div>
</div>

---

## Contribuer

Cette documentation est open source. Si vous trouvez des erreurs ou souhaitez ameliorer le contenu :

- Ouvrez une issue sur GitHub
- Proposez une pull request
- Rejoignez le Discord de la communaute

---

:::info Verification du code
Cette documentation a ete verifiee par rapport au code source decompile. Consultez le [rapport de verification](/docs/api/server-internals/verification) pour plus de details.
:::
