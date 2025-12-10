# GSB Bill Management System - Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/MongoDB-8.13.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" style="display:inline-block; margin:2px;">
  <img src="https://img.shields.io/badge/AWS_SDK-2.1692.0-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" style="display:inline-block; margin:2px;">
</p>

## Academic Project Notice

This project is developed as part of a school assignment for educational purposes. It demonstrates backend development skills, including RESTful API design, database management, authentication, and cloud storage integration. **This application is not intended for professional or production use** and serves solely as a learning exercise and portfolio piece.

## Project Overview

The GSB Bill Management System Backend is a RESTful API built with Node.js and Express that handles all server-side operations for the bill management application. It provides secure authentication, database operations, file storage, and business logic for managing expense bills and user accounts.

This backend service is designed to work with the separate Angular [Frontend](https://github.com/jalmeida17/bts-gsbfrontend-angular) application, providing a complete full-stack solution for expense management.

## Key Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication system
- **Password Hashing**: SHA-256 password encryption with salt
- **Token Verification**: Middleware for protecting routes
- **Role-based Access**: User and admin role management
- **Session Management**: Token expiration and renewal

### Bill Management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **File Upload**: Support for receipt and document attachments
- **Status Workflow**: Pending, Approved, Rejected status management
- **User Association**: Bills linked to specific users
- **Filtering**: Query bills by user, status, date range
- **Validation**: Server-side data validation

### User Management
- **User Registration**: New account creation with validation
- **User Authentication**: Login with email and password
- **Profile Management**: User information retrieval and updates
- **Role Assignment**: User and admin role support
- **Email Uniqueness**: Duplicate email prevention

### File Storage
- **AWS S3 Integration**: Cloud storage for file attachments
- **Multer Middleware**: File upload handling
- **Multiple Formats**: Support for PDF, JPG, PNG files
- **File Validation**: Type and size restrictions
- **Secure URLs**: Presigned URLs for file access

### Database
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Mongoose ODM**: Schema-based data modeling
- **Data Validation**: Schema-level validation rules
- **Relationships**: User-Bill associations with references
- **Indexing**: Optimized queries for performance

## Technology Stack

### Core Framework
- **Node.js**: JavaScript runtime environment
- **Express 5.1.0**: Web application framework
- **JavaScript (ES6+)**: Modern JavaScript features

### Database
- **MongoDB**: NoSQL document database
- **Mongoose 8.13.2**: MongoDB object modeling tool

### Authentication & Security
- **jsonwebtoken 9.0.2**: JWT token generation and verification
- **js-sha256 0.11.0**: SHA-256 hashing for passwords
- **cors 2.8.5**: Cross-Origin Resource Sharing middleware
- **dotenv 16.5.0**: Environment variable management

### File Handling
- **multer 1.4.5-lts.2**: Multipart form-data file uploads
- **aws-sdk 2.1692.0**: AWS S3 integration for file storage

## API Endpoints

### Authentication Routes
Base path: `/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/signup` | User registration | No |

### User Routes
Base path: `/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes |
| GET | `/users/:id` | Get user by ID | Yes |
| PUT | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |

### Bill Routes
Base path: `/bills`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bills` | Create new bill | Yes |
| GET | `/bills` | Get all bills | Yes |
| GET | `/bills/:id` | Get bill by ID | Yes |
| PUT | `/bills/:id` | Update bill | Yes |
| DELETE | `/bills/:id` | Delete bill | Yes |

## Data Models

### User Model

```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email address
  password: String,       // Hashed password (SHA-256)
  role: String,          // "user" or "admin"
  createdAt: String      // Account creation timestamp
}
```

**Validation Rules**:
- Name: Required
- Email: Required, unique, valid email format
- Password: Required, hashed before storage
- Role: Required, defaults to "user"

### Bill Model

```javascript
{
  date: String,          // Bill date
  amount: Number,        // Bill amount in euros
  proof: String,         // AWS S3 file URL
  description: String,   // Bill description
  user: ObjectId,        // Reference to User
  status: String,        // "Pending", "Approved", "Rejected"
  type: String,          // Bill category
  createdAt: String      // Submission timestamp
}
```

**Validation Rules**:
- Date: Required
- Amount: Required, positive number
- Proof: Required (file URL)
- Description: Required
- User: Required, valid ObjectId reference
- Status: Required, defaults to "Pending"
- Type: Required


### Token Verification

All protected routes use the `verifyToken` middleware:

```javascript
// Middleware checks for Authorization header
Authorization: Bearer <token>

// Validates token and attaches user to request
req.user = { id, email, role }
```

## File Upload Process

### Upload Flow

```
1. Client sends multipart/form-data request
   ↓
2. Multer middleware processes file
   ↓
3. File validation (type, size)
   ↓
4. Upload to AWS S3
   ↓
5. Generate presigned URL
   ↓
6. Store URL in database
   ↓
7. Return file URL to client
```

### Configuration

**Multer Setup** (`middleware/upload.js`):
```javascript
const multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
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

**AWS S3 Integration**:
```javascript
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/gsb_bills

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Password Salt
SALT=your_password_salt_here

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (v6 or higher)
- AWS Account (for S3 file storage)
- MongoDB database (local or cloud)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bts-gsbbackend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up MongoDB
```bash
# If using local MongoDB
mongod --dbpath /path/to/data

# Or use MongoDB Atlas connection string in .env
```

5. Configure AWS S3
- Create S3 bucket in AWS Console
- Generate access key and secret
- Add credentials to `.env`
- Configure bucket permissions

6. Start the server
```bash
npm start
```

The server will start on `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (if configured)


## Error Handling

### Error Response Format

```json
{
  "error": "Error message",
  "details": "Additional error details",
  "statusCode": 400
}
```

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 409 | Conflict - Duplicate resource |
| 500 | Internal Server Error - Server issue |

### Example Error Responses

**Invalid Credentials**:
```json
{
  "error": "Invalid email or password",
  "statusCode": 401
}
```

**Duplicate Email**:
```json
{
  "error": "User already exists",
  "statusCode": 409
}
```

**File Too Large**:
```json
{
  "error": "File size exceeds 5MB limit",
  "statusCode": 400
}
```

## Security Features

### Password Security
- SHA-256 hashing algorithm
- Salt added before hashing
- Original passwords never stored
- Secure password comparison

### Token Security
- JWT with expiration
- Secret key from environment variables
- Token validation on protected routes
- Automatic token expiration handling

### API Security
- CORS configuration for allowed origins
- Input validation and sanitization
- SQL injection prevention (NoSQL)
- Rate limiting (recommended for production)

### File Security
- File type validation
- File size restrictions
- Secure S3 bucket configuration
- Presigned URLs with expiration

## Database Management

### MongoDB Connection

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
```

### Connection Events

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
## Troubleshooting

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB
```bash
MongoDB connection error: MongoServerSelectionError
```

**Solutions**:
- Verify MongoDB is running: `mongod --version`
- Check MONGODB_URI in `.env`
- Verify network connectivity
- Check firewall settings
- For MongoDB Atlas: Whitelist IP address

### JWT Token Issues

**Problem**: Token verification fails
```json
{ "error": "Invalid token" }
```

**Solutions**:
- Verify JWT_SECRET matches in `.env`
- Check token format: "Bearer <token>"
- Ensure token hasn't expired
- Check Authorization header spelling

### File Upload Issues

**Problem**: File upload fails
```json
{ "error": "File upload failed" }
```

**Solutions**:
- Verify AWS credentials in `.env`
- Check S3 bucket permissions
- Verify file size (< 5MB)
- Check file type (PDF, JPG, PNG only)
- Ensure bucket CORS configuration

### CORS Issues

**Problem**: Frontend cannot connect
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions**:
- Configure CORS in `index.js`
- Add frontend URL to allowed origins
- Check request headers
- Verify HTTP method is allowed

## License

This is an academic project created for educational purposes. All rights reserved.

## Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the database solution
- AWS for cloud storage services
- JWT.io for authentication resources

---

**Note**: This project is part of a school curriculum and demonstrates competency in backend development, RESTful API design, and cloud integration. It is not intended for commercial use or deployment in production environments without significant enhancements to security, error handling, and scalability.
