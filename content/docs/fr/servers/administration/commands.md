---
id: commands
title: Commandes du serveur
sidebar_label: Commandes
sidebar_position: 1
---

# Commandes du serveur

Commandes console et en jeu pour l'administration du serveur Hytale.

---

## Commandes Joueur

Commandes pour gerer les joueurs, leurs modes de jeu, statistiques, effets et camera.

### gamemode

Change le mode de jeu d'un joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/gamemode <gamemode> [joueur]` |
| **Alias** | `gm` |
| **Permission** | `gamemode.self`, `gamemode.other` |

**Parametres :**
- `gamemode` - Le mode de jeu a definir (ex: Creative, Adventure, Survival)
- `joueur` (optionnel) - Joueur cible (necessite la permission `gamemode.other`)

**Exemples :**
```
/gamemode creative
/gamemode adventure NomJoueur
/gm survival
```

---

### kill

Tue instantanement un joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/kill [joueur]` |
| **Permission** | `kill.self`, `kill.other` |

**Parametres :**
- `joueur` (optionnel) - Joueur cible (necessite la permission `kill.other`)

**Exemples :**
```
/kill
/kill NomJoueur
```

---

### damage

Inflige des degats a un joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/damage [montant] [--silent] [joueur]` |
| **Alias** | `hurt` |
| **Permission** | `damage.self`, `damage.other` |

**Parametres :**
- `montant` (optionnel) - Quantite de degats a infliger (defaut: 1.0)
- `--silent` (drapeau) - Supprime le message de notification de degats
- `joueur` (optionnel) - Joueur cible (necessite la permission `damage.other`)

**Exemples :**
```
/damage
/damage 5.0
/damage 10 --silent NomJoueur
/hurt 3.5
```

---

### hide

Cache un joueur aux autres joueurs.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/hide <joueur> [cible]` |
| **Sous-commandes** | `show`, `all`, `showall` |

**Parametres :**
- `joueur` - Le joueur a cacher
- `cible` (optionnel) - Cacher uniquement d'un joueur specifique (cache de tous si non specifie)

**Sous-commandes :**
- `/hide show <joueur> [cible]` - Rendre un joueur visible a nouveau
- `/hide all` - Cacher tous les joueurs les uns des autres
- `/hide showall` - Rendre tous les joueurs visibles les uns aux autres

**Exemples :**
```
/hide NomJoueur
/hide NomJoueur JoueurCible
/hide show NomJoueur
/hide all
/hide showall
```

---

### whereami

Affiche la position actuelle et les informations du monde.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/whereami [joueur]` |
| **Permission** | `whereami.self`, `whereami.other` |
| **Mode de jeu** | Creative |

**Parametres :**
- `joueur` (optionnel) - Joueur cible (necessite la permission `whereami.other`)

**Informations affichees :**
- Nom du monde
- Coordonnees du chunk (X, Y, Z)
- Coordonnees de position (X, Y, Z)
- Rotation de la tete (lacet, tangage, roulis)
- Informations de direction et d'axe
- Statut de sauvegarde du chunk

**Exemples :**
```
/whereami
/whereami NomJoueur
```

---

### whoami

Affiche les informations d'identite du joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/whoami [joueur]` |
| **Alias** | `uuid` |
| **Mode de jeu** | Adventure |

**Parametres :**
- `joueur` (optionnel) - Joueur cible

**Informations affichees :**
- UUID du joueur
- Nom d'utilisateur
- Preference de langue

**Exemples :**
```
/whoami
/uuid
/whoami NomJoueur
```

---

### player stats

Gere les statistiques du joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/player stats <sous-commande>` |
| **Alias** | `stat` |

**Sous-commandes :**

| Sous-commande | Syntaxe | Description |
|---------------|---------|-------------|
| `get` | `/player stats get <nomStat> [joueur]` | Obtenir la valeur d'une stat |
| `set` | `/player stats set <nomStat> <valeur> [joueur]` | Definir une stat a une valeur specifique |
| `add` | `/player stats add <nomStat> <valeur> [joueur]` | Ajouter a une valeur de stat |
| `reset` | `/player stats reset [joueur]` | Reinitialiser toutes les stats |
| `settomax` | `/player stats settomax <nomStat> [joueur]` | Definir une stat a sa valeur maximale |
| `dump` | `/player stats dump [joueur]` | Afficher toutes les stats |

**Exemples :**
```
/player stats get health
/player stats set health 100
/player stats add stamina 50
/player stats settomax health
/player stats dump
```

---

### player effect

Appliquer ou effacer des effets sur les joueurs.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/player effect <sous-commande>` |

**Sous-commandes :**

| Sous-commande | Syntaxe | Description |
|---------------|---------|-------------|
| `apply` | `/player effect apply <effet> [duree] [joueur]` | Appliquer un effet |
| `clear` | `/player effect clear [joueur]` | Effacer tous les effets |

**Parametres :**
- `effet` - L'ID de l'asset d'effet a appliquer
- `duree` (optionnel) - Duree en ticks (defaut: 100)
- `joueur` (optionnel) - Joueur cible

**Permissions :**
- `player.effect.apply.self`, `player.effect.apply.other`
- `player.effect.clear.self`, `player.effect.clear.other`

**Exemples :**
```
/player effect apply speed_boost
/player effect apply regeneration 200
/player effect apply strength 150 NomJoueur
/player effect clear
```

---

### player camera

Controle les modes de camera du joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/player camera <sous-commande>` |

**Sous-commandes :**

| Sous-commande | Syntaxe | Description |
|---------------|---------|-------------|
| `reset` | `/player camera reset [joueur]` | Reinitialiser la camera par defaut |
| `topdown` | `/player camera topdown [joueur]` | Definir la vue camera du dessus |
| `sidescroller` | `/player camera sidescroller [joueur]` | Definir la vue camera side-scroller |
| `demo` | `/player camera demo <activate\|deactivate>` | Mode camera demo |

**Exemples :**
```
/player camera reset
/player camera topdown
/player camera sidescroller NomJoueur
/player camera demo activate
```

---

## Commandes Entite

Commandes pour gerer les entites dans le monde.

### entity clone

Clone une entite.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity clone [entite] [nombre]` |

**Parametres :**
- `entite` (optionnel) - ID de l'entite a cloner (utilise l'entite regardee si non specifie)
- `nombre` (optionnel) - Nombre de clones a creer (defaut: 1)

**Exemples :**
```
/entity clone
/entity clone 12345
/entity clone 12345 5
```

---

### entity remove

Supprime une entite du monde.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity remove [entite] [--others]` |

**Parametres :**
- `entite` (optionnel) - ID de l'entite a supprimer (utilise l'entite regardee si non specifie)
- `--others` (drapeau) - Supprimer toutes les autres entites non-joueur sauf celle specifiee

**Exemples :**
```
/entity remove
/entity remove 12345
/entity remove 12345 --others
```

---

### entity dump

Exporte les donnees de l'entite dans le journal du serveur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity dump [entite]` |

**Parametres :**
- `entite` (optionnel) - ID de l'entite a exporter (utilise l'entite regardee si non specifie)

**Exemples :**
```
/entity dump
/entity dump 12345
```

---

### entity clean

Supprime toutes les entites non-joueur du monde actuel.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity clean` |

**Attention :** C'est une commande destructive qui supprime toutes les entites sauf les joueurs.

**Exemples :**
```
/entity clean
```

---

### entity count

Affiche le nombre total d'entites dans le monde actuel.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity count` |

**Exemples :**
```
/entity count
```

---

### entity stats

Gere les statistiques des entites.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity stats <sous-commande>` |
| **Alias** | `stat` |

**Sous-commandes :**

| Sous-commande | Syntaxe | Description |
|---------------|---------|-------------|
| `get` | `/entity stats get <nomStat> [entite]` | Obtenir la valeur d'une stat |
| `set` | `/entity stats set <nomStat> <valeur> [entite]` | Definir une valeur de stat |
| `add` | `/entity stats add <nomStat> <valeur> [entite]` | Ajouter a une valeur de stat |
| `reset` | `/entity stats reset [entite]` | Reinitialiser toutes les stats |
| `settomax` | `/entity stats settomax <nomStat> [entite]` | Definir une stat au maximum |
| `dump` | `/entity stats dump [entite]` | Afficher toutes les stats |

**Exemples :**
```
/entity stats get health
/entity stats set health 50
/entity stats dump
```

---

### entity effect

Appliquer un effet aux entites.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity effect <effet> [duree] [entite]` |

**Parametres :**
- `effet` - L'ID de l'asset d'effet a appliquer
- `duree` (optionnel) - Duree en ticks (defaut: 100)
- `entite` (optionnel) - Entite cible

**Exemples :**
```
/entity effect poison
/entity effect slow 200
```

---

### entity intangible

Rend une entite intangible (sans collision).

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity intangible [--remove] [entite]` |

**Parametres :**
- `--remove` (drapeau) - Retirer le statut intangible au lieu de l'ajouter
- `entite` (optionnel) - Entite cible

**Exemples :**
```
/entity intangible
/entity intangible --remove
/entity intangible 12345
```

---

### entity invulnerable

Rend une entite invulnerable aux degats.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/entity invulnerable [--remove] [entite]` |

**Parametres :**
- `--remove` (drapeau) - Retirer le statut invulnerable au lieu de l'ajouter
- `entite` (optionnel) - Entite cible

**Exemples :**
```
/entity invulnerable
/entity invulnerable --remove
/entity invulnerable 12345
```

---

## Commandes Monde

Commandes pour gerer les chunks et les cartes du monde.

### chunk info

Affiche des informations detaillees sur un chunk.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/chunk info <x> <z>` |

**Parametres :**
- `x z` - Coordonnees du chunk (supporte les coordonnees relatives avec ~)

**Informations affichees :**
- Statut d'initialisation
- Statut de generation
- Statut de tick
- Statut de sauvegarde
- Details des sections

**Exemples :**
```
/chunk info 0 0
/chunk info ~ ~
/chunk info ~5 ~-3
```

---

### chunk load

Charge un chunk en memoire.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/chunk load <x> <z> [--markdirty]` |

**Parametres :**
- `x z` - Coordonnees du chunk (supporte les coordonnees relatives avec ~)
- `--markdirty` (drapeau) - Marquer le chunk comme necessitant une sauvegarde

**Exemples :**
```
/chunk load 0 0
/chunk load ~ ~
/chunk load 10 10 --markdirty
```

---

### chunk unload

Decharge un chunk de la memoire.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/chunk unload <x> <z>` |

**Parametres :**
- `x z` - Coordonnees du chunk (supporte les coordonnees relatives avec ~)

**Exemples :**
```
/chunk unload 0 0
/chunk unload ~ ~
```

---

### chunk regenerate

Regenere un chunk (ATTENTION : destructif).

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/chunk regenerate <x> <z>` |

**Parametres :**
- `x z` - Coordonnees du chunk (supporte les coordonnees relatives avec ~)

**Attention :** Cela regenerera le chunk, perdant toutes les modifications des joueurs.

**Exemples :**
```
/chunk regenerate 0 0
/chunk regenerate ~ ~
```

---

### worldmap discover

Decouvre des zones sur la carte du monde pour un joueur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/worldmap discover [zone]` |
| **Alias** | `disc` |

**Parametres :**
- `zone` (optionnel) - Nom de la zone a decouvrir, ou "all" pour decouvrir toutes les zones. Si non specifie, liste les zones disponibles.

**Exemples :**
```
/worldmap discover
/worldmap discover all
/worldmap discover ForestZone
/map disc all
```

---

### worldmap undiscover

Retire les zones decouvertes de la carte du monde.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/worldmap undiscover [zone]` |

**Parametres :**
- `zone` (optionnel) - Nom de la zone a retirer, ou "all" pour retirer toutes les zones. Si non specifie, liste les zones decouvertes.

**Exemples :**
```
/worldmap undiscover
/worldmap undiscover all
/worldmap undiscover ForestZone
```

---

## Commandes Serveur

Commandes pour l'administration du serveur.

### stop

Arrete le serveur proprement.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/stop [--crash]` |
| **Alias** | `shutdown` |

**Parametres :**
- `--crash` (drapeau) - Simuler un arret par crash au lieu d'un arret propre

**Exemples :**
```
/stop
/shutdown
/stop --crash
```

---

### kick

Expulse un joueur du serveur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/kick <joueur>` |

**Parametres :**
- `joueur` - Le joueur a expulser

**Exemples :**
```
/kick NomJoueur
```

---

### who

Liste tous les joueurs en ligne par monde.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/who` |
| **Mode de jeu** | Adventure |

**Informations affichees :**
- Joueurs organises par monde
- Noms d'affichage (si definis) et noms d'utilisateur

**Exemples :**
```
/who
```

---

### maxplayers

Obtient ou definit le nombre maximum de joueurs.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/maxplayers [montant]` |

**Parametres :**
- `montant` (optionnel) - Nouveau nombre maximum de joueurs. Si non specifie, affiche la valeur actuelle.

**Exemples :**
```
/maxplayers
/maxplayers 50
```

---

### auth

Commandes de gestion d'authentification.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/auth <sous-commande>` |

**Sous-commandes :**

| Sous-commande | Description |
|---------------|-------------|
| `status` | Verifier le statut d'authentification |
| `login` | Se connecter au service d'authentification |
| `select` | Selectionner un compte d'authentification |
| `logout` | Se deconnecter de l'authentification |
| `cancel` | Annuler l'authentification en cours |
| `persistence` | Gerer la persistance de l'authentification |

**Exemples :**
```
/auth status
/auth login
/auth logout
```

---

## Commandes Utilitaires

Commandes utilitaires generales.

### help

Affiche les informations d'aide pour les commandes.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/help [commande]` |
| **Alias** | `?` |
| **Mode de jeu** | Adventure |

**Parametres :**
- `commande` (optionnel) - Nom de la commande pour obtenir de l'aide. Ouvre l'interface de liste de commandes si non specifie.

**Exemples :**
```
/help
/?
/help gamemode
```

---

### backup

Cree une sauvegarde des donnees du serveur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/backup` |

**Prerequis :**
- Le serveur doit etre completement demarre
- Le repertoire de sauvegarde doit etre configure dans les options du serveur

**Exemples :**
```
/backup
```

---

### notify

Envoie une notification a tous les joueurs.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/notify [style] <message>` |

**Parametres :**
- `style` (optionnel) - Style de notification (Default, Warning, Error, etc.)
- `message` - Le message a envoyer (supporte les messages formates avec `{...}`)

**Exemples :**
```
/notify Bonjour a tous !
/notify Warning Redemarrage du serveur dans 5 minutes
/notify {"text": "Message formate", "color": "red"}
```

---

### sound 2d

Joue un effet sonore 2D.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/sound 2d <son> [categorie] [--all] [joueur]` |
| **Alias** | `play` |

**Parametres :**
- `son` - ID de l'asset d'evenement sonore
- `categorie` (optionnel) - Categorie de son (defaut: SFX)
- `--all` (drapeau) - Jouer pour tous les joueurs dans le monde
- `joueur` (optionnel) - Joueur cible

**Exemples :**
```
/sound 2d ui_click
/sound play notification SFX
/sound 2d alert --all
```

---

### sound 3d

Joue un effet sonore 3D positionnel.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/sound 3d <son> [categorie] <x> <y> <z> [--all] [joueur]` |
| **Alias** | `play3d` |

**Parametres :**
- `son` - ID de l'asset d'evenement sonore
- `categorie` (optionnel) - Categorie de son (defaut: SFX)
- `x y z` - Coordonnees de position (supporte les coordonnees relatives avec ~)
- `--all` (drapeau) - Jouer pour tous les joueurs dans le monde
- `joueur` (optionnel) - Joueur cible

**Exemples :**
```
/sound 3d explosion SFX 100 64 200
/sound play3d ambient ~ ~ ~
/sound 3d alert SFX ~ ~10 ~ --all
```

---

## Commandes de Debogage

Commandes pour le debogage et la surveillance.

### ping

Affiche les informations de ping/latence.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/ping [--detail] [joueur]` |
| **Sous-commandes** | `clear`, `graph` |
| **Mode de jeu** | Adventure |

**Parametres :**
- `--detail` (drapeau) - Afficher les informations de ping detaillees
- `joueur` (optionnel) - Joueur cible

**Sous-commandes :**
- `/ping clear [joueur]` - Effacer l'historique de ping
- `/ping graph [largeur] [hauteur] [joueur]` - Afficher le graphique de ping

**Exemples :**
```
/ping
/ping --detail
/ping NomJoueur
/ping clear
/ping graph 80 15
```

---

### version

Affiche les informations de version du serveur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/version` |

**Informations affichees :**
- Version du serveur
- Patchline
- Environnement (si pas release)

**Exemples :**
```
/version
```

---

### log

Gere les niveaux de journalisation.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/log <logger> [niveau] [--save] [--reset]` |

**Parametres :**
- `logger` - Nom du logger (ou "global" pour le logger global)
- `niveau` (optionnel) - Niveau de log (OFF, SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST, ALL)
- `--save` (drapeau) - Sauvegarder le niveau de log dans la config du serveur
- `--reset` (drapeau) - Reinitialiser le logger au niveau par defaut

**Exemples :**
```
/log global
/log global INFO
/log global FINE --save
/log network WARNING
/log network --reset
```

---

### server stats memory

Affiche les statistiques de memoire du serveur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/server stats memory` |
| **Alias** | `mem` |

**Informations affichees :**
- Memoire physique totale et libre
- Memoire swap totale et libre
- Utilisation de la memoire heap (init, utilise, commis, max, libre)
- Utilisation de la memoire non-heap
- Objets en attente de finalisation

**Exemples :**
```
/server stats memory
/server stats mem
```

---

### server stats cpu

Affiche les statistiques CPU du serveur.

| Propriete | Valeur |
|-----------|--------|
| **Syntaxe** | `/server stats cpu` |

**Informations affichees :**
- Charge CPU systeme
- Charge CPU processus
- Moyenne de charge systeme
- Temps de fonctionnement du processus

**Exemples :**
```
/server stats cpu
```
