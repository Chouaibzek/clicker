# Panda Clicker - Jeu Clicker en Vue.js

Un jeu clicker développé avec Vue.js 3, TypeScript et Vite, où vous cliquez sur un panda pour gagner des points de bambou et débloquer des améliorations.

![Panda Clicker Screenshot](./public/screenshot.png)

## 🎮 Fonctionnalités

### Mécaniques de base
- **Système de clic** : Cliquez sur le panda pour gagner des points de bambou
- **Compteur de bambou** : Affiche le nombre total de bambous gagnés
- **Améliorations** : Achetez des améliorations pour augmenter vos gains

### Types d'améliorations
- **Améliorations de clic** (vertes) : Augmentent le nombre de bambous gagnés par clic
- **Améliorations passives** (violettes) : Génèrent automatiquement des bambous au fil du temps (DPS)

### Système de sauvegarde
- **Sauvegarde manuelle** : Sauvegardez votre progression en cliquant sur le bouton "Sauver"
- **Indicateur de sauvegarde** : Affiche l'heure de la dernière sauvegarde
- **Réinitialisation** : Option pour réinitialiser complètement votre progression
- **Persistance** : Les données sont stockées dans le localStorage du navigateur

## 🏗️ Architecture technique

### Composants Vue.js

- **App.vue** : Composant principal qui coordonne tous les autres composants
- **PandaClicker.vue** : Gère l'image du panda cliquable et les événements de clic
- **DpsCounter.vue** : Affiche et gère les dégâts par seconde (gains passifs)
- **UpgradesPanel.vue** : Panneau latéral contenant la liste des améliorations disponibles
- **UpgradeItem.vue** : Représente un élément d'amélioration individuel

### Composables (Composition API)

- **useSaveSystem.ts** : Gère la sauvegarde et le chargement des données du jeu
  - Utilise localStorage pour la persistance des données
  - Expose les fonctions saveGame, loadGame et deleteSave
  - Gère l'horodatage des sauvegardes

### Flux de données

1. L'utilisateur clique sur le panda (PandaClicker)
2. L'événement est émis vers App.vue qui incrémente le compteur
3. L'utilisateur peut acheter des améliorations dans le panneau latéral
4. Les améliorations passives génèrent automatiquement des bambous
5. L'utilisateur peut sauvegarder sa progression ou la réinitialiser

## 🛠️ Technologies utilisées

- **Vue.js 3.5.18** : Framework JavaScript progressif
- **TypeScript** : Typage statique pour un code plus robuste
- **Vite 7.1.2** : Build tool ultra-rapide
- **Tailwind CSS 4.1.13** : Framework CSS utilitaire
- **Composition API** : API de composition pour une meilleure réutilisabilité du code
- **Single File Components** : Organisation du code en composants .vue

## 🚀 Comment jouer

1. Cliquez sur le panda pour gagner des bambous
2. Utilisez vos bambous pour acheter des améliorations dans le panneau latéral
3. Les améliorations passives généreront automatiquement des bambous
4. N'oubliez pas de sauvegarder votre progression !

## 📝 Idées d'améliorations futures

- Système de prestige pour recommencer avec des bonus permanents
- Plus de types d'améliorations (multiplicateurs, bonus temporaires)
- Succès à débloquer
- Statistiques détaillées (total de clics, bambous gagnés, etc.)
- Thèmes visuels différents
- Sons et effets visuels
- Sauvegarde automatique (actuellement uniquement manuelle)

## 📦 Installation et développement

```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/clicker.git
cd clicker

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

