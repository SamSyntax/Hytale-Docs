---
id: commands
title: Commandes
sidebar_label: Commandes
sidebar_position: 5
---

# Commandes

Créez des commandes personnalisées pour votre plugin.

## Commande de Base

```java
public class HelloCommand implements Command {

    @Override
    public void execute(CommandSender sender, String[] args) {
        sender.sendMessage("Bonjour, le monde !");
    }
}
```

## Enregistrement

```java
@Override
public void onEnable() {
    registerCommand("hello", new HelloCommand());
}
```
