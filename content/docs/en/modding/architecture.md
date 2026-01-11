---
id: architecture
title: Modding Architecture
sidebar_label: Architecture
sidebar_position: 2
description: Understanding Hytale's server-first modding architecture
---

# Modding Architecture

Hytale uses a unique **server-first architecture** for all modifications.

## Server-Side Execution

All mods execute on the server:

```mermaid
graph LR
    A[Server with Mods] --> B[Client 1]
    A --> C[Client 2]
    A --> D[Client N]
```

### Benefits

- Players don't install mods
- Seamless server switching
- Enhanced security
- Instant mod updates

## How It Works

1. Player connects to server
2. Server streams required assets
3. Client renders content
4. All logic runs server-side

## Implications for Developers

- Design with server performance in mind
- Optimize asset sizes
- Implement validation server-side
- Test with multiple concurrent players

## Next Steps

- [Data Assets](/docs/modding/data-assets/overview)
- [Java Plugins](/docs/modding/plugins/overview)
