---
id: overview
title: API Reference Overview
sidebar_label: Overview
sidebar_position: 1
description: Hytale API documentation for developers
---

# API Reference Overview

This section documents the Hytale APIs available for developers.

## Official Hytale API

The official Hytale API provides endpoints for accessing public game data.

### Base URL

```
https://hytale.com/api
```

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/blog/post/published` | GET | List published blog posts |
| `/blog/post/slug/{slug}` | GET | Get post by slug |
| `/jobs` | GET | List job openings |

### Authentication

Currently, the public API endpoints do not require authentication.

[Full Endpoint Reference →](/docs/api/official/endpoints)

## Community SDKs

Several SDKs are available for different programming languages:

### Node.js SDK

```bash
npm install @hytale-api/sdk
```

```javascript
import { HytaleAPI } from '@hytale-api/sdk';

const api = new HytaleAPI();
const posts = await api.blog.getPosts();
```

[Node.js SDK Documentation →](/docs/api/sdks/javascript)

### PHP SDK

```bash
composer require hytale-api/sdk-php
```

```php
use HytaleAPI\Client;

$client = new Client();
$posts = $client->blog()->getPosts();
```

[PHP SDK Documentation →](/docs/api/sdks/php)

## Third-Party APIs

### HyAuth

Community authentication service for server operators.

```
https://api.hyauth.com
```

### Hytale Servers API

Server listing and voting API.

```
https://api.hytale-servers.net
```

## Plugin Development API

For Java plugin development, the server exposes a comprehensive API:

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

:::info Coming Soon
The server source code will be published 1-2 months after launch, providing complete API documentation.
:::

## JSON Schemas

Hytale uses JSON for data assets. Schema documentation will be added as the API is documented.

## Rate Limiting

| API | Rate Limit |
|-----|------------|
| Official API | No documented limit |
| HyAuth | 100 requests/minute |
| Community APIs | Varies |

## Getting Started

<div className="doc-card-grid">
  <DocCard item={{
    type: 'link',
    label: 'Official Endpoints',
    href: '/docs/api/official/endpoints',
    description: 'Official Hytale API endpoints'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'JavaScript SDK',
    href: '/docs/api/sdks/javascript',
    description: 'Node.js and browser SDK'
  }} />
</div>
