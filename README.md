# GSB Backend - Node.js API

## Description
API backend développée en Node.js pour le système de gestion GSB. Cette API RESTful fournit tous les services nécessaires pour la gestion des frais de déplacement, l'authentification, la gestion des utilisateurs et l'administration du système.

## Technologies Utilisées
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB/MySQL** - Base de données
- **Mongoose/Sequelize** - ORM/ODM
- **JWT** - Authentification
- **bcrypt** - Hachage des mots de passe
- **cors** - Gestion CORS
- **helmet** - Sécurité
- **dotenv** - Variables d'environnement

## Fonctionnalités Principales
- 🔐 **Authentification JWT**
- 👥 **Gestion des utilisateurs et rôles**
- 📊 **API CRUD complète**
- 🔒 **Middleware de sécurité**
- 📝 **Validation des données**
- 📁 **Gestion des fichiers**
- 🔍 **Recherche et filtrage**

## Structure du Projet
```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── config/
├── tests/
├── uploads/
└── docs/
```

## Installation et Configuration

### Prérequis
- Node.js (version 16+)
- npm ou yarn
- MongoDB/MySQL

### Installation
```bash
# Cloner le repository
git clone [repository-url]
cd gsb-backend

# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

### Variables d'Environnement
Créer un fichier `.env` à la racine du projet:
```env
SALT = your_salt_key
JWT_SECRET = your_jwt_secret

ID = your_id
SECRET = your_secret_id
BUCKET_NAME = your_bucket_name

MONGODB_URI = your_mongodb_uri
```

## Scripts Disponibles

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Lancer les tests
npm test

# Build (si TypeScript)
npm run build
```

## API Endpoints

### Authentification
```
POST /api/auth/login

```

### Utilisateurs
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Frais
```
GET    /api/bills
GET    /api/bills/:id
POST   /api/bills
PUT    /api/bills/:id
DELETE /api/bills/:id
```

## Middleware de Sécurité
- **helmet** - Protection des headers HTTP
- **cors** - Configuration CORS
- **rate-limiting** - Limitation du taux de requêtes
- **validation** - Validation des données d'entrée
- **authentication** - Vérification JWT
- **authorization** - Contrôle des permissions

## Base de Données

### Modèles Principaux
- **User** - Utilisateurs du système
- **Bill** - Frais de déplacement

## Support
Pour toute question ou problème, me contacter