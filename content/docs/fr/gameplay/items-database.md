---
id: base-donnees-items
title: Base de Donnees Items et Blocs
sidebar_label: Base de Donnees
sidebar_position: 5
description: Items et blocs documentes depuis le code decompile du serveur Hytale Early Access
---

# Base de Donnees Items et Blocs

Cette base de donnees documente les items et blocs confirmes par l'analyse du code decompile du serveur Hytale. Les items dans Hytale sont definis via des fichiers JSON charges au runtime, ce qui fait de cette liste une representation des types de blocs et structures d'items trouves dans le code plutot qu'un inventaire complet.

:::warning Donnees Verifiees Uniquement
Cette page contient uniquement des informations verifiees depuis le code serveur decompile. Le contenu speculatif ou non confirme a ete supprime. Le jeu actuel contient beaucoup plus d'items definis dans des fichiers d'assets externes.
:::

## Apercu du Systeme d'Items

Les items dans Hytale utilisent un systeme base sur les composants avec les proprietes suivantes :

| Propriete | Description |
|-----------|-------------|
| `id` | Identifiant unique |
| `icon` | Reference de l'icone UI |
| `maxStack` | Taille maximale de pile (variable par defaut) |
| `qualityId` | Reference du niveau de qualite |
| `categories` | Tableau d'assignations de categories |
| `tool` | Configuration d'outil (si applicable) |
| `weapon` | Configuration d'arme (si applicable) |
| `armor` | Configuration d'armure (si applicable) |
| `glider` | Configuration de planeur (si applicable) |
| `utility` | Configuration d'item utilitaire |
| `consumable` | Si l'item est consomme a l'utilisation |
| `maxDurability` | Valeur de durabilite maximale |

## Systeme d'Armure

Hytale utilise un systeme d'armure a 4 emplacements :

| Emplacement | Index | Description |
|-------------|-------|-------------|
| Tete (Head) | 0 | Casque/couvre-chef |
| Torse (Chest) | 1 | Plastron/armure corporelle |
| Mains (Hands) | 2 | Gants/gantelets |
| Jambes (Legs) | 3 | Jambieres/pantalons |

### Proprietes d'Armure

Les items d'armure peuvent avoir les configurations suivantes :

- **ArmorSlot** : Quel emplacement l'armure occupe
- **BaseDamageResistance** : Valeur de reduction de degats fixe
- **DamageResistance** : Table des types de degats vers modificateurs de resistance
- **DamageEnhancement** : Table des types de degats vers modificateurs d'amelioration
- **KnockbackResistances** : Resistance au recul par type de degat
- **StatModifiers** : Modifications de stats d'entite quand equipee
- **CosmeticsToHide** : Elements cosmetiques a cacher quand equipee

## Systeme d'Outils

Les outils utilisent un systeme base sur les specifications avec "GatherType" determinant quels blocs ils peuvent interagir :

| Propriete | Description |
|-----------|-------------|
| GatherType | Type de collecte auquel cette spec s'applique |
| Power | Valeur de puissance de minage/collecte |
| Quality | Niveau de qualite de la spec d'outil |
| Speed | Modificateur de vitesse de l'outil |
| DurabilityLossBlockTypes | Taux de perte de durabilite par type de bloc |

## Systeme d'Armes

Les armes peuvent modifier les stats d'entite quand equipees :

| Propriete | Description |
|-----------|-------------|
| StatModifiers | Table des types de stats vers modificateurs |
| EntityStatsToClear | Stats a effacer quand l'arme est desequipee |
| RenderDualWielded | Si rendu en double maniement |

## Types de Blocs Confirmes

### Blocs de Roche et Pierre

Depuis les fichiers de migration et references de code :

| ID de Bloc | Categorie | Notes |
|------------|-----------|-------|
| `Rock_Stone` | Terrain | Pierre standard |
| `Rock_Marble` | Terrain | Variante marbre |
| `Rock_Quartzite` | Terrain | Variante quartzite |
| `Rock_Shale` | Terrain | Schiste/pierre sombre |
| `Rock_Volcanic` | Terrain | Roche volcanique |
| `Rock_Basalt_Brick_Half` | Construction | Demi-dalle brique basalte |
| `Rock_Sandstone_Brick_Red` | Construction | Brique gres rouge |
| `Rock_Stone_Cobble` | Terrain | Pierre taillee |
| `Rock_Stone_Cobble_Mossy_Half` | Construction | Demi pierre taillee moussue |
| `Rock_Shale_Brick` | Construction | Brique pierre sombre |

### Blocs de Cristal

| ID de Bloc | Variantes | Notes |
|------------|-----------|-------|
| `Rock_Crystal_Blue_Big` | Big, Medium, Small | Formations cristal bleu |
| `Rock_Crystal_Green_Big` | Big, Medium, Small | Formations cristal vert |
| `Rock_Crystal_Pink_Big` | Big, Medium, Small | Formations cristal rose |
| `Rock_Crystal_Purple_Big` | Big, Medium, Small | Formations cristal violet |
| `Rock_Crystal_Red_Big` | Big, Medium, Small | Formations cristal rouge |
| `Rock_Crystal_Yellow_Big` | Big, Medium, Small | Formations cristal jaune |

### Types de Sol

| ID de Bloc | Description |
|------------|-------------|
| `Soil_Grass` | Sol couvert d'herbe |
| `Soil_Dirt` | Terre basique |
| `Soil_Clay` | Sol argileux |
| `Soil_Gravel` | Terrain de gravier |
| `Soil_Mud` | Terrain de boue |
| `Soil_Needles` | Sol couvert d'aiguilles de pin |

### Types de Bois

Le jeu propose divers types de bois avec branches, troncs et planches :

| Type de Bois | Variantes de Branches | Couleur Planches |
|--------------|----------------------|------------------|
| Ash (Frene) | Corner, Long, Short | - |
| Aspen (Tremble) | Corner, Long, Short | - |
| Azure | Corner, Long, Short | - |
| Beech (Hetre) | Corner, Long, Short | - |
| Birch (Bouleau) | Corner, Long, Short | Light (Clair) |
| Burnt (Brule) | Corner, Long, Short | Black (Noir) |
| Cedar (Cedre) | Corner, Long, Short | Red (Rouge) |
| CrimsonMaple | Corner, Long, Short | - |
| Crystal | Corner, Long, Short | - |
| Dry (Sec) | Corner, Long, Short | Beige |
| Gumboab | Corner, Long, Short | - |
| Oak (Chene) | Corner, Long, Short | Soft (Doux) |
| Palm (Palmier) | Corner, Long, Short | Golden (Dore) |
| Redwood (Sequoia) | Corner, Long, Short | - |
| Sand (Sable) | Corner, Long, Short | - |
| Spruce (Epicea) | Corner, Long, Short | Dark (Sombre) |

### Plantes et Vegetation

| ID de Bloc | Description |
|------------|-------------|
| `Plant_Boomshroom_Large` | Grand champignon explosif |
| `Plant_Boomshroom_Small` | Petit champignon explosif |
| `Plant_Mushroom_Red` | Champignon rouge |

### Os et Fossiles

| ID de Bloc | Description |
|------------|-------------|
| `Bone_Spine` | Bloc d'epine dorsale |
| `Bone_Stalagtite_Big` | Grande stalactite osseuse |
| `Bone_Stalagtite_Small` | Petite stalactite osseuse |
| `Bone_Ribs_Long` | Longues cotes |

### Blocs Decoratifs

| ID de Bloc | Description |
|------------|-------------|
| `Deco_Iron_Bars` | Barres de fer decoratives |
| `Deco_Iron_Brazier` | Brasero en fer |
| `Deco_Bronze_Brazier` | Brasero en bronze |
| `Deco_Stone_Brazier` | Brasero en pierre |
| `Deco_Cauldron` | Bloc chaudron |
| `Deco_Iron_Stack` | Pile de fer decorative |
| `Deco_EggSacks_Medium` | Decoration sac d'oeufs |
| `Container_Coffin` | Conteneur cercueil |

### Formations de Glace

| ID de Bloc | Description |
|------------|-------------|
| `Rock_Ice_Stalagtite_Small` | Petite stalactite de glace |

### Structures

| ID de Bloc | Description |
|------------|-------------|
| `WindMill_Wing` | Aile de moulin a vent |
| `Wood_Platform_Kweebec` | Plateforme en bois Kweebec |

## Fluides

Hytale possede un systeme de fluides avec 6 types confirmes :

| ID Fluide | Bloc Source | Bloc Ecoulement | Proprietes |
|-----------|-------------|-----------------|------------|
| `Fluid_Water` | `Water_Source` | `Water` | Eau standard |
| `Fluid_Water_Test` | `Water_Finite` | - | Eau test/finie |
| `Fluid_Lava` | `Lava_Source` | `Lava` | Lave causant des degats |
| `Fluid_Tar` | `Tar_Source` | `Tar` | Goudron collant |
| `Fluid_Slime` | `Slime_Source` | `Slime` | Slime rebondissant |
| `Fluid_Poison` | `Poison_Source` | `Poison` | Poison causant des degats |

## Systeme de Qualite d'Item

Les items ont des niveaux de qualite qui affectent leur apparence et potentiellement leurs stats. Le systeme inclut :

- Reference ID de qualite
- Valeur de qualite (niveau numerique)
- Indicateurs visuels (textures d'arriere-plan dans `UI/ItemQualities/`)

## Categories d'Items

Les items sont organises en categories pour l'affichage d'inventaire :

- Les categories ont une structure hierarchique (parent/enfants)
- Chaque categorie a un ID, nom, icone et ordre d'affichage
- Les icones sont stockees dans `Icons/ItemCategories/`

## Items Editeur et Debug

Le jeu inclut des items speciaux pour l'edition de monde :

| ID Item | But |
|---------|-----|
| `Editor_Block` | Outil d'edition de bloc |
| `Editor_Empty` | Placeholder editeur vide |
| `Editor_Anchor` | Outil point d'ancrage |
| `EditorTool_Paste` | Outil de collage |
| `EditorTool_PrefabEditing_SelectPrefab` | Selection de prefab |
| `Debug_Cube` | Cube de debug |
| `Debug_Model` | Modele de debug |

## Systeme de Sons

Les items referencent des evenements sonores pour les interactions :

| Evenement Sonore | Description |
|------------------|-------------|
| `SFX_Player_Craft_Item_Inventory` | Completion de fabrication |
| `SFX_Player_Drop_Item` | Depot d'item |
| `SFX_Player_Pickup_Item` | Ramassage d'item |
| `SFX_Item_Break` | Casse d'item |
| `SFX_Item_Repair` | Reparation d'item |

---

## Voir Aussi

- [Types d'Items](/docs/modding/data-assets/items/item-types) - Schema de configuration d'items
- [Types de Blocs](/docs/api/server-internals/modules/blocks) - Documentation du systeme de blocs
- [Guide de Fabrication](/docs/gameplay/crafting-guide) - Comment fabriquer des items

---

*Cette base de donnees est generee depuis l'analyse du code serveur Hytale decompile. Pour la liste complete des items, referez-vous aux fichiers d'assets du jeu.*
