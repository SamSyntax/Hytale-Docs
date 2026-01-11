---
id: overview
title: Vue d'ensemble du Modding
sidebar_label: Vue d'ensemble
sidebar_position: 1
description: Guide complet du modding Hytale - plugins, data assets et art assets
---

# Vue d'ensemble du Modding

Hytale a été conçu dès le départ avec le modding au cœur. Cette section couvre tout ce que vous devez savoir sur la création de contenu pour Hytale.

## Philosophie

> "Notre objectif est de permettre aux moddeurs de reproduire tout ce que nous faisons en utilisant les mêmes outils que nous utilisons en interne."
> — Hypixel Studios

### "Une Communauté, Un Client"

Contrairement à Minecraft, où les joueurs luttent souvent avec des incompatibilités de versions et des installations de modpacks complexes, Hytale élimine totalement ces frictions avec son **approche côté serveur** :

- Même le mode solo fonctionne via un serveur local
- Les joueurs rejoignent n'importe quel serveur moddé sans installer de mods
- Le serveur envoie automatiquement tout le contenu requis
- Un seul client propre pour tous les serveurs - pas de clients moddés supportés

> "Le principe directeur est d'éviter d'avoir besoin d'un client moddé."
> — [Stratégie Modding Hytale](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

### Avantages

| Avantage | Description |
|----------|-------------|
| **Expérience Fluide** | Changez de serveur sans configuration |
| **Mises à Jour Instantanées** | Les modifications de mods s'appliquent immédiatement |
| **Sécurité Renforcée** | Pas de clients modifiés |
| **UX Simple** | Pas de gestion de modpacks |

## Catégories de Mods

### 1. Plugins Serveur (Java)

Plugins basés sur Java pour un contrôle approfondi du serveur :

- Écrits en Java, empaquetés en fichiers `.jar`
- Similaires aux plugins Bukkit/Spigot
- Accès à l'API serveur complète
- Requiert des connaissances en programmation

**Cas d'utilisation :**
- Commandes personnalisées
- Systèmes d'économie
- Logique de minijeux
- Plugins de protection
- Outils d'administration

[En savoir plus sur les Plugins →](/docs/modding/plugins/overview)

### 2. Data Assets (JSON)

Fichiers de configuration JSON pour le contenu du jeu :

- Modifiables via l'Asset Editor (pas de code requis)
- Peuvent être combinés avec les Plugins
- Support du rechargement en direct

**Éléments configurables :**
- Blocs et items
- NPCs et comportements
- Tables de loot
- Génération de monde

[En savoir plus sur les Data Assets →](/docs/modding/data-assets/overview)

### 3. Art Assets

Contenu visuel pour vos mods :

- Modèles 3D (`.blockymodel`)
- Animations (`.blockyanim`)
- Textures (PNG, 32px ou 64px par unité)
- Effets sonores

**Outil principal :** [Blockbench](https://blockbench.net) avec le [plugin Hytale officiel](https://github.com/JannisX11/hytale-blockbench-plugin)

[En savoir plus sur les Art Assets →](/docs/modding/art-assets/overview)

### 4. Scripting Visuel (Bientôt)

Scripting basé sur des nœuds inspiré des Blueprints Unreal Engine :

- Pas de code requis - concevez la logique visuellement
- Créez des mécaniques de jeu en connectant des nœuds
- Comble le fossé entre designers et programmeurs
- Les programmeurs peuvent créer des nœuds personnalisés en Java

> "Le scripting visuel comble le fossé entre designers et programmeurs. Les designers peuvent construire la logique visuellement sans erreurs de syntaxe."
> — [Stratégie Modding Hytale](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

## Outils de Développement

### Outils Officiels

| Outil | Objectif | Statut |
|-------|----------|--------|
| **Hytale Asset Editor** | Éditer les data assets JSON | Disponible |
| **Plugin Blockbench** | Créer des modèles 3D et animations | Disponible |
| **Asset Graph Editor** | Worldgen, NPCs, brushes | En développement |
| **Outils Mode Créatif** | Édition de monde en jeu | Disponible |
| **Outils Machinima** | Créer des cinématiques | Disponible |

### Outils Communautaires

- [HytaleModding.dev](https://hytalemodding.dev) - Documentation et guides
- [HytalePlugins.gg](https://hytaleplugins.gg) - Hub de plugins
- [CurseForge](https://www.curseforge.com/hytale) - Plateforme de distribution

## Structure des Fichiers Serveur

```
/hytale-server/
├── mods/           # Packs de contenu
├── plugins/        # Plugins Java (.jar)
├── config/         # Configuration serveur
└── worlds/         # Sauvegardes de mondes
```

## État Actuel

Basé sur l'article officiel [Stratégie Modding](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status) :

### Disponible au Lancement (13 Janvier 2026)

- Plugins Java serveur (Java 25, Gradle 9.2.0)
- Data Assets via Asset Editor
- Modèles 3D via [plugin Blockbench](https://github.com/JannisX11/hytale-blockbench-plugin)
- [Mode Créatif](https://hytale.com/news/2025/11/hytale-creative-mode) avec outils de construction
- Outils Machinima pour cinématiques
- Le serveur n'est pas obfusqué (peut être décompilé)

### À Venir

- **Code source serveur** (1-2 mois après lancement) - sera entièrement open source
- **Système de scripting visuel** - logique basée sur des nœuds inspirée des Blueprints Unreal
- **Génération de Monde V2** - éditeur de nœuds visuel pour les biomes ([Source](https://hytale.com/news/2026/1/the-future-of-world-generation))
- Documentation GitBook complète

### Limitations Connues (Early Access)

- Documentation incomplète (GitBook en cours)
- Certains workflows sont bruts et non polis
- L'Asset Graph Editor nécessite du polish
- Intégrité des données non garantie - **les sauvegardes sont obligatoires**
- Sauvegardez fréquemment (risque de crash en early access)

## Pour Commencer

Choisissez votre chemin selon vos objectifs :

<div className="doc-card-grid">
  <DocCard item={{
    type: 'link',
    label: 'Data Assets',
    href: '/docs/modding/data-assets/overview',
    description: 'Créez des blocs, items, NPCs sans coder'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'Plugins Java',
    href: '/docs/modding/plugins/overview',
    description: 'Construisez des plugins serveur puissants'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'Art Assets',
    href: '/docs/modding/art-assets/overview',
    description: 'Créez des modèles, textures, animations'
  }} />
</div>
