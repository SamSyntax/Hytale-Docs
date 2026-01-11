---
id: overview
title: Vue d'ensemble de la reference API
sidebar_label: Vue d'ensemble
sidebar_position: 1
description: Documentation de l'API Hytale pour les developpeurs
---

# Vue d'ensemble de la reference API

Cette section documente les APIs Hytale disponibles pour les developpeurs.

## API officielle Hytale

L'API officielle Hytale fournit des endpoints pour acceder aux donnees publiques du jeu.

### URL de base

```
https://hytale.com/api
```

### Endpoints disponibles

| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/blog/post/published` | GET | Liste des articles de blog publies |
| `/blog/post/slug/{slug}` | GET | Obtenir un article par son slug |
| `/jobs` | GET | Liste des offres d'emploi |

### Authentification

Actuellement, les endpoints publics de l'API ne necessitent pas d'authentification.

[Reference complete des endpoints →](/docs/api/official/endpoints)

## SDKs communautaires

Plusieurs SDKs sont disponibles pour differents langages de programmation :

### SDK Node.js

```bash
npm install @hytale-api/sdk
```

```javascript
import { HytaleAPI } from '@hytale-api/sdk';

const api = new HytaleAPI();
const posts = await api.blog.getPosts();
```

[Documentation du SDK Node.js →](/docs/api/sdks/javascript)

### SDK PHP

```bash
composer require hytale-api/sdk-php
```

```php
use HytaleAPI\Client;

$client = new Client();
$posts = $client->blog()->getPosts();
```

[Documentation du SDK PHP →](/docs/api/sdks/php)

## APIs tierces

### HyAuth

Service d'authentification communautaire pour les operateurs de serveurs.

```
https://api.hyauth.com
```

### API Hytale Servers

API de liste de serveurs et de votes.

```
https://api.hytale-servers.net
```

## API de developpement de plugins

Pour le developpement de plugins Java, le serveur expose une API complete :

```java
import com.hytale.api.entity.Player;
import com.hytale.api.world.World;
import com.hytale.api.event.EventHandler;

@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    player.sendMessage("Welcome!");
}
```

:::info Bientot disponible
Le code source du serveur sera publie 1 a 2 mois apres le lancement, fournissant une documentation complete de l'API.
:::

## Schemas JSON

Hytale utilise JSON pour les assets de donnees. La documentation des schemas sera ajoutee au fur et a mesure que l'API sera documentee.

## Limitation de debit

| API | Limite de debit |
|-----|-----------------|
| API officielle | Aucune limite documentee |
| HyAuth | 100 requetes/minute |
| APIs communautaires | Variable |

## Pour commencer

<div className="doc-card-grid">
  <DocCard item={{
    type: 'link',
    label: 'Endpoints officiels',
    href: '/docs/api/official/endpoints',
    description: 'Endpoints de l\'API officielle Hytale'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'SDK JavaScript',
    href: '/docs/api/sdks/javascript',
    description: 'SDK pour Node.js et navigateur'
  }} />
</div>
