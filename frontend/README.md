# 🎨 Frontend - Ô TOMO Sushi

## 📋 Vue d'ensemble

Interface React moderne avec thème boisé chaleureux pour l'application restaurant Ô TOMO Sushi.

## 🚀 Technologies

- **React 19** + **TypeScript**
- **Vite 7.1.5** - Build tool ultra-rapide
- **Tailwind CSS 3.4** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes

## 🎨 Système de design

### Thème boisé
Le design utilise une palette **boisée moderne** qui évoque la chaleur et l'authenticité d'un restaurant japonais :

```css
/* Couleurs principales */
wood-50 à wood-900    /* Gamme de bruns naturels */
warm-50 à warm-500    /* Tons chauds complémentaires */
```

### Typographie
- **Headings** : `Playfair Display` (serif élégant)
- **Body** : `Inter` (sans-serif lisible)

### Principe design
- **Zéro transparence** : Tous les éléments sont opaques
- **Textures subtiles** : Motifs bois intégrés
- **Animations douces** : Transitions Framer Motion

## 📁 Architecture des composants

```
src/
├── components/
│   ├── AdminLogin.tsx       # Authentification admin
│   ├── AdminPanel.tsx       # Interface d'administration
│   ├── BannerSlider.tsx     # Gestion des bannières
│   ├── Cart.tsx             # Panier utilisateur
│   ├── Footer.tsx           # Pied de page
│   ├── HeaderPremium.tsx    # Navigation principale
│   ├── HeroPremium.tsx      # Section hero
│   ├── MenuModern.tsx       # Affichage du menu
│   ├── MenuSection.tsx      # Section de menu
│   ├── OrderManager.tsx     # Gestion des commandes
│   ├── ProductManager.tsx   # Gestion des produits
│   └── SimpleBanner.tsx     # Bannière simple
├── data/
│   └── menu.ts              # Données du menu
├── types/
│   └── index.ts             # Types TypeScript
└── App.tsx                  # Composant racine
```

## 🛠️ Installation

```bash
npm install
```

## 🚀 Développement

```bash
npm run dev
```
Server disponible sur `http://localhost:5173/`

## 📦 Build de production

```bash
npm run build
```

## 🧹 Linting

```bash
npm run lint
```

## ⚙️ Configuration

### Tailwind CSS
Fichier `tailwind.config.js` avec :
- Palette boisée personnalisée
- Ombres customisées
- Typography plugin

### Vite
Configuration optimisée pour :
- Hot Module Replacement (HMR)
- TypeScript
- Assets optimization

## 🎯 Composants principaux

### AdminPanel
Interface complète d'administration avec :
- Sidebar navigation
- Gestion des produits
- Suivi des commandes
- Statistiques temps réel

### MenuModern
Affichage moderne du menu avec :
- Catégories filtrables
- Cards produits interactives
- Animations hover

### Cart
Panier dynamique avec :
- Gestion des quantités
- Calcul automatique
- Validation commande

## 🎨 Customisation

### Couleurs
Modifier les couleurs dans `tailwind.config.js` :

```javascript
extend: {
  colors: {
    wood: {
      50: '#fdfcfb',
      // ... autres tons
    }
  }
}
```

### Animations
Personnaliser les animations Framer Motion dans les composants.

## 📱 Responsive Design

- **Mobile First** : Design optimisé mobile
- **Breakpoints** : sm, md, lg, xl, 2xl
- **Grid** : Layout adaptatif CSS Grid/Flexbox

## 🔧 Scripts disponibles

```bash
npm run dev        # Mode développement
npm run build      # Build production
npm run preview    # Preview du build
npm run lint       # ESLint check
```

## 📈 Performance

- **Lazy loading** des composants
- **Tree shaking** automatique avec Vite
- **Assets optimization**
- **Bundle splitting**

---

*Interface développée avec ❤️ et du bon café*
