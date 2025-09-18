# 🍱 Ô TOMO Sushi - Restaurant Japonais Moderne

## 📋 Description

**Ô TOMO Sushi** est une application web moderne pour restaurant japonais, alliant élégance et fonctionnalité. Le site propose une expérience utilisateur immersive avec un **thème boisé chaleureux** qui évoque l'authenticité et la modernité d'un restaurant japonais haut de gamme.

### ✨ Caractéristiques principales

- **🎨 Thème boisé moderne** : Design chaleureux avec palette de couleurs naturelles
- **📱 Interface responsive** : Optimisé pour tous les appareils
- **🛒 Système de commande** : Panier intuitif avec gestion des quantités
- **👨‍💼 Panel administrateur** : Interface complète de gestion
- **🎯 Bannières dynamiques** : Système de communication flexible
- **🚚 Gestion livraison** : Zones et créneaux personnalisables

## 🚀 Technologies utilisées

### Frontend
- **React 19** + **TypeScript**
- **Vite 7.1.5** (Build tool)
- **Tailwind CSS 3.4** + Configuration personnalisée
- **Framer Motion** (Animations)
- **Lucide React** (Icônes)

### Backend
- **Node.js** + **TypeScript**
- **Express.js** (API REST)

### Outils de développement
- **ESLint** (Linting)
- **PostCSS** (CSS processing)
- **Concurrently** (Scripts parallèles)

## 🎨 Design System

### Palette de couleurs boisée
```css
/* Tons boisés principaux */
wood-50: #fdfcfb    /* Très clair */
wood-100: #f7f3f0   /* Clair */
wood-200: #ede4d8   /* Moyen clair */
wood-300: #ddd0bd   /* Moyen */
wood-500: #8b6f47   /* Standard */
wood-700: #5d4731   /* Foncé */
wood-800: #4a3426   /* Très foncé */
wood-900: #3d2a1e   /* Ultra foncé */

/* Tons chauds complémentaires */
warm-50: #fef9f3    /* Beige très clair */
warm-100: #fdf2e9   /* Beige clair */
warm-200: #fce7d1   /* Beige doré */
warm-300: #f9d5a7   /* Doré clair */
warm-400: #f4a261   /* Orange chaud */
warm-500: #e76f51   /* Rouge-orange */
```

### Typographie
- **Titres** : Playfair Display (serif élégant)
- **Corps** : Inter (sans-serif moderne)

## 📁 Structure du projet

```
o-tomo-sushi/
├── 📁 frontend/              # Application React
│   ├── 📁 src/
│   │   ├── 📁 components/    # Composants React
│   │   │   ├── AdminPanel.tsx    # Panel administrateur
│   │   │   ├── MenuModern.tsx    # Affichage menu
│   │   │   ├── Cart.tsx          # Panier
│   │   │   └── ...
│   │   ├── 📁 data/          # Données statiques
│   │   ├── 📁 types/         # Types TypeScript
│   │   ├── App.tsx           # Composant principal
│   │   └── main.tsx          # Point d'entrée
│   ├── tailwind.config.js    # Config Tailwind
│   └── package.json
├── 📁 backend/               # API Node.js
└── README.md
```

## 🛠️ Installation

### Prérequis
- **Node.js** 20.19+ ou 22.12+
- **npm** ou **yarn**

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone [URL_DU_REPO]
   cd o-tomo-sushi
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Installer les dépendances frontend et backend**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

## 🚀 Démarrage

### Développement (Frontend + Backend)
```bash
npm run dev
```

### Frontend uniquement
```bash
cd frontend
npm run dev
```
Application disponible sur : `http://localhost:5173/`

### Backend uniquement
```bash
cd backend
npm run dev
```
API disponible sur : `http://localhost:3000/`

### Production
```bash
npm run build
npm start
```

## 🎯 Fonctionnalités

### 🛒 Interface client
- **Menu interactif** avec catégories et filtres
- **Panier dynamique** avec gestion des quantités
- **Système de commande** avec validation
- **Bannières promotionnelles** configurables
- **Design responsive** pour mobile et desktop

### 👨‍💼 Panel administrateur
- **Tableau de bord** avec statistiques
- **Gestion des produits** (CRUD complet)
- **Suivi des commandes** en temps réel
- **Configuration des bannières**
- **Gestion des créneaux** de livraison
- **Base de données clients**

### 🎨 Thème boisé
- **Aucune transparence** (design opaque)
- **Textures bois** subtiles
- **Gradients chaleureux**
- **Ombres naturelles**
- **Animations fluides**

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env` dans le dossier racine :
```env
# Backend
PORT=3000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3000
```

### Personnalisation du thème
Modifier `frontend/tailwind.config.js` pour ajuster les couleurs :
```javascript
extend: {
  colors: {
    wood: { /* Vos couleurs boisées */ },
    warm: { /* Vos couleurs chaudes */ }
  }
}
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement** : [Votre nom]
- **Design** : Thème boisé moderne et élégant

## 📞 Contact

- **Email** : [votre.email@exemple.com]
- **Site web** : [votre-site.com]

---

*Fait avec ❤️ pour les amateurs de sushi et de beau code*
