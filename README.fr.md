# Système de Gestion des Notes de Frais GSB - Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/MongoDB-8.13.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/AWS_SDK-2.1692.0-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" style="display:inline-block; margin:2px;">
</p>

> Lire en [anglais](README.md)

## Avis sur le Projet Académique

Ce projet est développé dans le cadre d'un travail scolaire à des fins éducatives. Il met en avant des compétences en développement backend, notamment la conception d'API RESTful, la gestion de base de données, l'authentification et l'intégration de stockage cloud. **Cette application n'est pas destinée à un usage professionnel ou en production** et sert uniquement comme exercice d'apprentissage et pièce de portfolio.

## Présentation du Projet

Le Backend du Système de Gestion des Notes de Frais GSB est une API RESTful construite avec Node.js et Express qui gère toutes les opérations côté serveur de l'application de gestion des notes de frais. Il fournit une authentification sécurisée, des opérations en base de données, du stockage de fichiers et la logique métier pour la gestion des notes de frais et des comptes utilisateurs.

Ce service backend est conçu pour fonctionner avec l'application [Frontend](https://github.com/jalmeida17/bts-gsbfrontend-angular) Angular distincte, fournissant une solution full-stack complète pour la gestion des notes de frais.

## Fonctionnalités Principales

### Authentification & Autorisation
- **Authentification basée sur JWT** : Système d'authentification sécurisé par jeton
- **Hachage des Mots de Passe** : Chiffrement SHA-256 avec sel
- **Vérification de Jeton** : Middleware pour la protection des routes
- **Accès Basé sur les Rôles** : Gestion des rôles utilisateur et administrateur
- **Gestion de Session** : Expiration et renouvellement de jetons

### Gestion des Notes de Frais
- **Opérations CRUD** : Fonctionnalité complète Créer, Lire, Mettre à Jour, Supprimer
- **Téléversement de Fichiers** : Prise en charge des justificatifs et pièces jointes
- **Workflow de Statut** : Gestion des statuts En Attente, Approuvé, Rejeté
- **Association Utilisateur** : Notes de frais liées à des utilisateurs spécifiques
- **Filtrage** : Recherche des notes de frais par utilisateur, statut, plage de dates
- **Validation** : Validation des données côté serveur

### Gestion des Utilisateurs
- **Inscription Utilisateur** : Création de nouveau compte avec validation
- **Authentification Utilisateur** : Connexion avec email et mot de passe
- **Gestion de Profil** : Récupération et mise à jour des informations utilisateur
- **Attribution de Rôle** : Prise en charge des rôles utilisateur et administrateur
- **Unicité de l'Email** : Prévention des emails en doublon

### Stockage de Fichiers
- **Intégration AWS S3** : Stockage cloud pour les pièces jointes
- **Middleware Multer** : Gestion du téléversement de fichiers
- **Formats Multiples** : Prise en charge des fichiers PDF, JPG, PNG
- **Validation de Fichiers** : Restrictions de type et de taille
- **URL Sécurisées** : URL pré-signées pour l'accès aux fichiers

### Base de Données
- **Intégration MongoDB** : Base de données NoSQL pour un stockage flexible
- **Mongoose ODM** : Modélisation des données basée sur les schémas
- **Validation des Données** : Règles de validation au niveau du schéma
- **Relations** : Associations Utilisateur-Note de Frais avec références
- **Indexation** : Requêtes optimisées pour la performance

## Stack Technique

### Framework Principal
- **Node.js** : Environnement d'exécution JavaScript
- **Express 5.1.0** : Framework d'application web
- **JavaScript (ES6+)** : Fonctionnalités JavaScript modernes

### Base de Données
- **MongoDB** : Base de données documentaire NoSQL
- **Mongoose 8.13.2** : Outil de modélisation d'objets MongoDB

### Authentification & Sécurité
- **jsonwebtoken 9.0.2** : Génération et vérification de jetons JWT
- **js-sha256 0.11.0** : Hachage SHA-256 pour les mots de passe
- **cors 2.8.5** : Middleware Cross-Origin Resource Sharing
- **dotenv 16.5.0** : Gestion des variables d'environnement

### Gestion des Fichiers
- **multer 1.4.5-lts.2** : Téléversement de fichiers multipart form-data
- **aws-sdk 2.1692.0** : Intégration AWS S3 pour le stockage de fichiers

## Points de Terminaison de l'API

### Routes d'Authentification
Chemin de base : `/auth`

| Méthode | Endpoint | Description | Authentification Requise |
|---------|----------|-------------|--------------------------|
| POST | `/auth/login` | Connexion utilisateur | Non |
| POST | `/auth/signup` | Inscription utilisateur | Non |

### Routes Utilisateurs
Chemin de base : `/users`

| Méthode | Endpoint | Description | Authentification Requise |
|---------|----------|-------------|--------------------------|
| GET | `/users` | Récupérer tous les utilisateurs | Oui |
| GET | `/users/:id` | Récupérer un utilisateur par ID | Oui |
| PUT | `/users/:id` | Mettre à jour un utilisateur | Oui |
| DELETE | `/users/:id` | Supprimer un utilisateur | Oui |

### Routes Notes de Frais
Chemin de base : `/bills`

| Méthode | Endpoint | Description | Authentification Requise |
|---------|----------|-------------|--------------------------|
| POST | `/bills` | Créer une nouvelle note de frais | Oui |
| GET | `/bills` | Récupérer toutes les notes de frais | Oui |
| GET | `/bills/:id` | Récupérer une note de frais par ID | Oui |
| PUT | `/bills/:id` | Mettre à jour une note de frais | Oui |
| DELETE | `/bills/:id` | Supprimer une note de frais | Oui |

## Modèles de Données

### Modèle Utilisateur

```javascript
{
  name: String,           // Nom complet de l'utilisateur
  email: String,          // Adresse email unique
  password: String,       // Mot de passe haché (SHA-256)
  role: String,          // "user" ou "admin"
  createdAt: String      // Horodatage de création du compte
}
```

**Règles de Validation** :
- Nom : Obligatoire
- Email : Obligatoire, unique, format email valide
- Mot de passe : Obligatoire, haché avant stockage
- Rôle : Obligatoire, par défaut "user"

### Modèle Note de Frais

```javascript
{
  date: String,          // Date de la note de frais
  amount: Number,        // Montant en euros
  proof: String,         // URL du fichier AWS S3
  description: String,   // Description de la note de frais
  user: ObjectId,        // Référence à l'Utilisateur
  status: String,        // "Pending", "Approved", "Rejected"
  type: String,          // Catégorie de la note
  createdAt: String      // Horodatage de soumission
}
```

**Règles de Validation** :
- Date : Obligatoire
- Montant : Obligatoire, nombre positif
- Justificatif : Obligatoire (URL du fichier)
- Description : Obligatoire
- Utilisateur : Obligatoire, référence ObjectId valide
- Statut : Obligatoire, par défaut "Pending"
- Type : Obligatoire


### Vérification du Jeton

Toutes les routes protégées utilisent le middleware `verifyToken` :

```javascript
// Le middleware vérifie l'en-tête Authorization
Authorization: Bearer <token>

// Valide le jeton et attache l'utilisateur à la requête
req.user = { id, email, role }
```

## Processus de Téléversement de Fichiers

### Flux de Téléversement

```
1. Le client envoie une requête multipart/form-data
   ↓
2. Le middleware Multer traite le fichier
   ↓
3. Validation du fichier (type, taille)
   ↓
4. Téléversement vers AWS S3
   ↓
5. Génération de l'URL pré-signée
   ↓
6. Stockage de l'URL en base de données
   ↓
7. Retour de l'URL du fichier au client
```

### Configuration

**Configuration de Multer** (`middleware/upload.js`) :
```javascript
const multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})
```

**Intégration AWS S3** :
```javascript
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
```

## Variables d'Environnement

Créer un fichier `.env` à la racine du projet :

```env
# Connexion MongoDB
MONGODB_URI=mongodb://localhost:27017/gsb_bills

# Secret JWT
JWT_SECRET=your_jwt_secret_key_here

# Sel pour les Mots de Passe
SALT=your_password_salt_here

# Configuration AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name

# Configuration Serveur
PORT=3000
NODE_ENV=development
```

## Démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm (v9 ou supérieur)
- MongoDB (v6 ou supérieur)
- Compte AWS (pour le stockage S3)
- Base de données MongoDB (locale ou cloud)

### Installation

1. Cloner le dépôt
```bash
git clone <repository-url>
cd bts-gsbbackend
```

2. Installer les dépendances
```bash
npm install
```

3. Créer le fichier `.env`
```bash
cp .env.example .env
# Modifier .env avec votre configuration
```

4. Configurer MongoDB
```bash
# Si vous utilisez MongoDB en local
mongod --dbpath /path/to/data

# Ou utiliser une chaîne de connexion MongoDB Atlas dans .env
```

5. Configurer AWS S3
- Créer un bucket S3 dans la console AWS
- Générer une clé d'accès et un secret
- Ajouter les identifiants dans `.env`
- Configurer les permissions du bucket

6. Démarrer le serveur
```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`

### Scripts Disponibles

- `npm start` - Démarrer le serveur de production
- `npm run dev` - Démarrer le serveur de développement avec nodemon (si configuré)


## Gestion des Erreurs

### Format de Réponse d'Erreur

```json
{
  "error": "Message d'erreur",
  "details": "Détails supplémentaires de l'erreur",
  "statusCode": 400
}
```

### Codes d'Erreur Courants

| Code Statut | Description |
|-------------|-------------|
| 400 | Bad Request - Données d'entrée invalides |
| 401 | Unauthorized - Jeton manquant ou invalide |
| 403 | Forbidden - Permissions insuffisantes |
| 404 | Not Found - La ressource n'existe pas |
| 409 | Conflict - Ressource en doublon |
| 500 | Internal Server Error - Problème serveur |

### Exemples de Réponses d'Erreur

**Identifiants Invalides** :
```json
{
  "error": "Invalid email or password",
  "statusCode": 401
}
```

**Email en Doublon** :
```json
{
  "error": "User already exists",
  "statusCode": 409
}
```

**Fichier Trop Volumineux** :
```json
{
  "error": "File size exceeds 5MB limit",
  "statusCode": 400
}
```

## Fonctionnalités de Sécurité

### Sécurité des Mots de Passe
- Algorithme de hachage SHA-256
- Sel ajouté avant le hachage
- Mots de passe originaux jamais stockés
- Comparaison sécurisée des mots de passe

### Sécurité des Jetons
- JWT avec expiration
- Clé secrète depuis les variables d'environnement
- Validation du jeton sur les routes protégées
- Gestion automatique de l'expiration des jetons

### Sécurité de l'API
- Configuration CORS pour les origines autorisées
- Validation et nettoyage des entrées
- Prévention des injections SQL (NoSQL)
- Limitation du débit (recommandée en production)

### Sécurité des Fichiers
- Validation du type de fichier
- Restrictions sur la taille des fichiers
- Configuration sécurisée du bucket S3
- URL pré-signées avec expiration

## Gestion de la Base de Données

### Connexion MongoDB

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
```

### Événements de Connexion

```javascript
db.on('error', (err) => {
  console.log('MongoDB connection error:', err)
})

db.on('open', () => {
  console.log('MongoDB connection opened')
})

db.on('disconnected', () => {
  console.log('MongoDB disconnected')
})
```
## Dépannage

### Problèmes de Connexion MongoDB

**Problème** : Impossible de se connecter à MongoDB
```bash
MongoDB connection error: MongoServerSelectionError
```

**Solutions** :
- Vérifier que MongoDB tourne : `mongod --version`
- Vérifier MONGODB_URI dans `.env`
- Vérifier la connectivité réseau
- Vérifier les paramètres du pare-feu
- Pour MongoDB Atlas : Mettre l'adresse IP en liste blanche

### Problèmes de Jeton JWT

**Problème** : La vérification du jeton échoue
```json
{ "error": "Invalid token" }
```

**Solutions** :
- Vérifier que JWT_SECRET correspond dans `.env`
- Vérifier le format du jeton : "Bearer <token>"
- S'assurer que le jeton n'a pas expiré
- Vérifier l'orthographe de l'en-tête Authorization

### Problèmes de Téléversement de Fichiers

**Problème** : Le téléversement de fichier échoue
```json
{ "error": "File upload failed" }
```

**Solutions** :
- Vérifier les identifiants AWS dans `.env`
- Vérifier les permissions du bucket S3
- Vérifier la taille du fichier (< 5 Mo)
- Vérifier le type de fichier (PDF, JPG, PNG uniquement)
- S'assurer de la configuration CORS du bucket

### Problèmes CORS

**Problème** : Le frontend ne peut pas se connecter
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions** :
- Configurer CORS dans `index.js`
- Ajouter l'URL du frontend aux origines autorisées
- Vérifier les en-têtes de la requête
- Vérifier que la méthode HTTP est autorisée

## Licence

Ceci est un projet académique créé à des fins éducatives. Tous droits réservés.

## Remerciements

- L'équipe Express.js pour l'excellent framework web
- L'équipe MongoDB pour la solution de base de données
- AWS pour les services de stockage cloud
- JWT.io pour les ressources d'authentification

---

**Note** : Ce projet fait partie d'un cursus scolaire et démontre des compétences en développement backend, conception d'API RESTful et intégration cloud. Il n'est pas destiné à un usage commercial ou à un déploiement en environnement de production sans améliorations significatives en matière de sécurité, gestion des erreurs et scalabilité.
