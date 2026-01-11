---
id: docker
title: Docker Deployment
sidebar_label: Docker
sidebar_position: 2
---

# Docker Deployment

Run server in Docker.

## docker-compose.yml

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

## Usage

```bash
docker-compose up -d
```
