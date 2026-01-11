---
id: overview
title: Development Tools Overview
sidebar_label: Overview
sidebar_position: 1
description: Tools for creating Hytale content
---

# Development Tools Overview

Hytale provides a suite of tools for content creation, from 3D modeling to in-game editing. According to the official [Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status), Hypixel Studios aims to provide the same tools internally used by the development team.

## Official Tools

### Blockbench + Hytale Plugin

The official tool for creating 3D models and animations. Blockbench replaces the internal "Hytale Model Maker" tool to better support established creative workflows in the community.

> "We officially support Blockbench for creating Hytale models, textures, and animations."
> — [Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

**Features:**
- Create `.blockymodel` files with consistent pixel ratios
- Animate with `.blockyanim` format
- Bone hierarchy support
- Live export to Hytale-compatible formats
- Quality-of-life improvements for Hytale workflow

**Installation:**
1. Download [Blockbench](https://www.blockbench.net/)
2. Install the [Hytale plugin](https://github.com/JannisX11/hytale-blockbench-plugin) from the plugin manager

**Official Resources:**
- [An Introduction to Making Models for Hytale](https://hytale.com/news/2025/12/an-introduction-to-making-models-for-hytale)
- [GitHub Repository](https://github.com/JannisX11/hytale-blockbench-plugin)

[Blockbench Guide →](/docs/tools/blockbench/installation)

### Hytale Asset Editor

Built-in editor for JSON data assets.

**Features:**
- Edit blocks, items, NPCs
- Live reload - see changes instantly
- No programming required

**Limitations:**
- Some asset types not yet supported
- NPC and world generation editors incomplete

[Asset Editor Guide →](/docs/tools/asset-editor/overview)

### Asset Graph Editor

Node-based editor for complex systems.

**Use cases:**
- World generation
- NPC behaviors
- Scripted brushes

:::note In Development
The Asset Graph Editor is not fully polished at launch but will be improved.
:::

### Creative Mode Tools

In-game tools for world building. According to the official [Creative Mode blog post](https://hytale.com/news/2025/11/hytale-creative-mode):

> "By swapping to Creative Mode in your world, you can fly around and explore, create, edit, make things explode, and more."
> — Ktar, Creative Mode Engineer

**Features:**
- **Paintbrush**: Paint shapes (pyramids, cones, squares) with customizable materials, density, and masks
- **Prefab System**: Load and edit prefabs in a separate editing environment
- **Model Changer**: Access to 100+ different NPC models for content creation
- **Customizable Flight**: Adjust speed, controls, flight mode (hover/directional), and inertia
- Selection and copy/paste

[Creative Mode Guide →](/docs/tools/creative-mode)

### Machinima Tools

Create cinematics and videos with keyframe-based camera animation.

**Features:**
- **Camera Actor**: Create camera entities with keyframe animation
- Define trajectories, speeds, and custom behaviors
- Create cinematic sequences for trailers and content

> "The Machinima Tools have many more features not displayed in quick demos, and they are scheduled for a massive upgrade in functionality and user experience in the coming months after launch."
> — [Hytale Creative Mode](https://hytale.com/news/2025/11/hytale-creative-mode)

[Machinima Guide →](/docs/tools/machinima)

## External Tools

### IDE Recommendations

| IDE | Best For | Cost |
|-----|----------|------|
| IntelliJ IDEA | Java plugins | Free (Community) |
| VS Code | JSON editing, general | Free |
| Eclipse | Java plugins | Free |

### Version Control

Use Git for managing your projects:

```bash
git init
git add .
git commit -m "Initial commit"
```

### Image Editors

For texture creation:

- [GIMP](https://www.gimp.org/) - Free, full-featured
- [Aseprite](https://www.aseprite.org/) - Pixel art focused
- Photoshop - Industry standard

## Tool Comparison

| Task | Recommended Tool |
|------|-----------------|
| 3D Models | Blockbench |
| Animations | Blockbench |
| Textures | GIMP / Photoshop |
| JSON Data | Asset Editor / VS Code |
| Java Plugins | IntelliJ IDEA |
| World Building | Creative Mode |

## Workflow Example

Creating a custom creature:

```mermaid
graph LR
    A[Design Concept] --> B[Create Model in Blockbench]
    B --> C[Add Animations]
    C --> D[Create Textures]
    D --> E[Define NPC JSON]
    E --> F[Test in Game]
    F --> G[Iterate]
```

## File Formats

| Format | Purpose | Tool |
|--------|---------|------|
| `.blockymodel` | 3D models | Blockbench |
| `.blockyanim` | Animations | Blockbench |
| `.json` | Data assets | Asset Editor |
| `.png` | Textures | Image editor |
| `.jar` | Java plugins | IDE |

## Getting Started

<div className="doc-card-grid">
  <DocCard item={{
    type: 'link',
    label: 'Blockbench Setup',
    href: '/docs/tools/blockbench/installation',
    description: 'Install and configure Blockbench'
  }} />
  <DocCard item={{
    type: 'link',
    label: 'Asset Editor',
    href: '/docs/tools/asset-editor/overview',
    description: 'Learn the built-in editor'
  }} />
</div>
