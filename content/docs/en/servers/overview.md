---
id: overview
title: Server Administration Overview
sidebar_label: Overview
sidebar_position: 1
description: Guide to setting up and managing Hytale servers
---

# Server Administration Overview

This section covers everything you need to know about hosting and managing Hytale servers. Running your own servers is supported from Early Access day one ([Source](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)).

## Architecture

Hytale uses a **server-first architecture** where all game content lives on the server:

- Even single-player runs through a local server
- Clients connect without installing mods
- Server streams all content automatically
- All game logic executes server-side

> "Hypixel Studios chose Java for Hytale servers because their backend team is very comfortable writing high-performance Java, which has let them heavily optimize server code."
> — [Server Technology Overview](https://hytale.com/news/2019/1/an-overview-of-hytales-server-technology)

### Technical Details

| Specification | Value |
|--------------|-------|
| Server Language | Java |
| Client Language | C# |
| Protocol | QUIC |
| Tick Rate | 30 TPS (default) |
| Java Version | **Java 25** required |
| Gradle | 9.2.0 (for plugin development) |

### Source Code Availability

The server is **not obfuscated**, allowing you to decompile it to understand internal systems. Hypixel Studios plans to release the full server source code **1-2 months after launch** ([Source](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)).

## System Requirements

### Performance Considerations

**View distance** is the biggest factor in both client and server performance. Doubling view distance (e.g., 192 to 384 blocks) quadruples the amount of data the server must handle.

### Minimum (Small Server, ~10-16 players)

| Component | Requirement |
|-----------|-------------|
| CPU | 4 cores, 2GHz+ (speed > core count) |
| RAM | 4-6 GB |
| Storage | 50 GB NVMe SSD |
| Java | **Java 25** |
| Network | 100 Mbps upload |

### Recommended (Medium Server, ~20-30 players)

| Component | Requirement |
|-----------|-------------|
| CPU | 6+ cores, fast clock speed |
| RAM | 8-12 GB |
| Storage | 100 GB NVMe SSD |
| Network | 500 Mbps upload |

### Large Servers (50+ players)

| Component | Requirement |
|-----------|-------------|
| CPU | 8+ cores, high single-thread performance |
| RAM | 16-32 GB |
| Storage | 200 GB NVMe SSD |
| Network | 1 Gbps upload |

:::tip Storage Performance
World loading and generation depend heavily on disk speed. NVMe SSDs provide the best results and help prevent stutters when players explore new areas. Avoid traditional hard drives.
:::

## Quick Start

1. **Download** the server files from [hytale.com](https://hytale.com)
2. **Configure** your `server.properties` file
3. **Open ports** (default: 25565)
4. **Start** the server

```bash
java -Xms4G -Xmx8G -jar hytale-server.jar
```

[Detailed Installation Guide →](/docs/servers/setup/installation)

## Server Configuration

### Core Settings

```properties
# server.properties
server-name=My Hytale Server
port=25565
max-players=50
view-distance=10
```

[Full Configuration Reference →](/docs/servers/setup/configuration)

## Administration

### Key Tasks

- [**Commands**](/docs/servers/administration/commands) - Console and in-game commands
- [**Permissions**](/docs/servers/administration/permissions) - Player permission system
- [**Whitelist**](/docs/servers/administration/whitelist) - Access control

### Security Considerations

- Configure firewall rules
- Use whitelist for private servers
- Regular backups
- DDoS protection for public servers

## Modding & Plugins

Servers can run:

- **Java Plugins** (`.jar` files in `/plugins/`)
- **Data Packs** (JSON content in `/mods/`)
- **Art Assets** (models, textures, sounds)

```
/hytale-server/
├── plugins/        # Java plugins
├── mods/           # Content packs
├── config/         # Configuration
├── worlds/         # World data
└── logs/           # Server logs
```

[Plugin Development Guide →](/docs/modding/plugins/overview)

## Hosting Options

| Option | Pros | Cons |
|--------|------|------|
| **Self-Hosted** | Full control, cost-effective | Requires technical knowledge |
| **VPS** | Good balance of control/ease | Monthly cost |
| **Game Hosting** | Easy setup, managed | Less control, higher cost |

[Hosting Guide →](/docs/servers/hosting/self-hosting)

## Deployment with Docker

```yaml
version: '3.8'
services:
  hytale:
    image: hytale-server:latest
    ports:
      - "25565:25565"
    volumes:
      - ./data:/server
    environment:
      - JAVA_OPTS=-Xms4G -Xmx8G
```

[Docker Deployment Guide →](/docs/servers/hosting/docker)

## EULA & Monetization

### Allowed

- Cosmetic purchases
- Donations
- Rank perks (non-gameplay)

### Prohibited

- Pay-to-win mechanics
- Selling gameplay advantages
- Distributing the client

:::warning
Violating the EULA may result in server blacklisting. Always review official guidelines.
:::

## Getting Started

<div className="doc-card-grid">
  <DocCard item={{
    type: 'link',
    label: 'Requirements',
    href: '/docs/servers/setup/requirements',
    description: 'Hardware and software requirements'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'Installation',
    href: '/docs/servers/setup/installation',
    description: 'Step-by-step setup guide'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'Configuration',
    href: '/docs/servers/setup/configuration',
    description: 'Configure your server'
  }} />
</div>
