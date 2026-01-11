---
id: commands
title: Commands
sidebar_label: Commands
sidebar_position: 5
---

# Commands

Create custom commands for your plugin.

## Basic Command

```java
public class HelloCommand implements Command {

    @Override
    public void execute(CommandSender sender, String[] args) {
        sender.sendMessage("Hello, World!");
    }
}
```

## Registering

```java
@Override
public void onEnable() {
    registerCommand("hello", new HelloCommand());
}
```
