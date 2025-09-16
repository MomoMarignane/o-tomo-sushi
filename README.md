# 🍣 Ô TOMO Sushi - MVP Site Web

MVP moderne et épuré pour le restaurant Izakaya japonais Ô TOMO Sushi à Saint-Maximin-la-Sainte-Baume.

## 📋 Aperçu du Projet

### **Contexte**
Ô TOMO Sushi est un restaurant Izakaya japonais proposant une cuisine authentique dans un cadre convivial. Ce MVP modernise la présence digitale avec une UX améliorée et un design épuré.

### **Objectifs**
- ✅ Navigation responsive et intuitive
- ✅ Design moderne inspiré de l'esthétique japonaise
- ✅ Menu interactif avec panier
- ✅ Click & collect
- ✅ Interface de réservation
- ✅ Performance optimisée

## 🚀 Stack Technique

### **Frontend**
- **React 18** + TypeScript
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Vite** pour le build

### **Backend**
- **Node.js** + Express + TypeScript
- **API REST** simple
- Stockage en mémoire (pour le MVP)

## 📁 Structure du Projet

```
o-tomo/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants UI
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MenuSection.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── Footer.tsx
│   │   ├── data/           # Données statiques
│   │   │   └── menu.ts
│   │   ├── types/          # Types TypeScript
│   │   │   └── index.ts
│   │   ├── App.tsx         # Composant principal
│   │   └── main.tsx        # Point d'entrée
│   ├── package.json
│   └── tailwind.config.js
└── backend/                 # API Node.js
    ├── src/
    │   └── index.ts        # Serveur Express
    ├── package.json
    └── tsconfig.json
```

## 🛠️ Installation et Utilisation

### **Prérequis**
- Node.js 18+ 
- npm ou yarn

### **Installation**

1. **Cloner le projet**
```bash
git clone <repo-url>
cd o-tomo
```

2. **Installation Frontend**
```bash
cd frontend
npm install
```

3. **Installation Backend**
```bash
cd ../backend
npm install
```

### **Développement**

1. **Démarrer le backend** (Terminal 1)
```bash
cd backend
npm run dev
# Serveur sur http://localhost:3001
```

2. **Démarrer le frontend** (Terminal 2)
```bash
cd frontend
npm run dev
# Application sur http://localhost:5173
```

### **Build de Production**

1. **Backend**
```bash
cd backend
npm run build
npm start
```

2. **Frontend**
```bash
cd frontend
npm run build
# Fichiers dans dist/
```

## 🎨 Fonctionnalités Implémentées

### **✅ Interface Utilisateur**
- Header avec navigation et contact
- Hero section avec présentation du restaurant
- Menu interactif avec filtres par catégorie
- Recherche de plats
- Panier flottant avec gestion des quantités
- Footer avec informations complètes

### **✅ Menu Interactif**
- Catalogue de plats organisé par catégories
- Filtrage dynamique (Sushi, Sashimi, Maki, etc.)
- Recherche textuelle
- Ajout au panier avec compteur
- Images des plats (avec fallback)

### **✅ Panier & Commande**
- Panier latéral coulissant
- Gestion des quantités
- Calcul automatique du total
- Interface de commande (prototype)

### **✅ Backend API**
- `POST /api/orders` - Créer une commande
- `GET /api/orders/:id` - Récupérer une commande
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations/:id` - Récupérer une réservation
- `GET /api/health` - Status de l'API

### **✅ Design Responsive**
- Mobile-first approach
- Grille adaptive
- Navigation mobile
- Typographie élégante (Inter + Playfair Display)

## 🎯 Fonctionnalités à Développer

### **Phase 2**
- [ ] Formulaire de commande complet
- [ ] Formulaire de réservation
- [ ] Intégration paiement (Stripe)
- [ ] Notifications email
- [ ] Base de données persistante
- [ ] Panel administrateur

### **Phase 3**
- [ ] Système de points fidélité
- [ ] Menu saisonnier
- [ ] Multi-langues (FR/EN)
- [ ] Progressive Web App
- [ ] Analytics et métriques

## 🎨 Design System

### **Couleurs**
- **Primary**: Orange (#f0770b) - Chaleur japonaise
- **Neutral**: Gris (#737373) - Élégance
- **Text**: Charbon (#171717)

### **Typographie**
- **Headers**: Playfair Display (serif élégant)
- **Body**: Inter (sans-serif moderne)

### **Composants**
- Boutons avec états hover/focus
- Cards avec ombres subtiles
- Animations de transition fluides

## 📱 Responsive Design

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

## 🚀 Déploiement

### **Frontend (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

### **Backend (Railway/Heroku)**
```bash
cd backend
npm run build
# Déployer avec start: "node dist/index.js"
```

## 📊 Métriques de Performance

- **Lighthouse Score**: 90+ (cible)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Bundle Size**: <500KB

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**MVP développé pour Ô TOMO Sushi**  
Restaurant Izakaya japonais - Saint-Maximin-la-Sainte-Baume
