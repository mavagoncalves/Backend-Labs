# Backend Development Lab: Secure Task API

This repository contains a RESTful API built with Node.js, Express, and MongoDB Atlas. It fulfills the requirements for Lab 1 and Lab 2, covering CRUD operations, database integration, and comprehensive security middleware.

## Technical Specifications
- Runtime: Node.js (v20+)
- Framework: Express.js
- Database: MongoDB Atlas (Mongoose ODM)
- Security: Helmet, Bcryptjs, JSONWebToken (JWT)

## Security Implementation
- Helmet Middleware: Implemented to set secure HTTP headers and prevent common web vulnerabilities.
- Header Obfuscation: The `x-powered-by` header is explicitly disabled to prevent technology fingerprinting.
- Password Hashing: User credentials (specifically for user "doe") are hashed using Bcrypt before storage.
- Multi-layer Authentication:
  - API Key: Custom middleware `verifyAPIKey` validates requests via headers or query strings.
  - JWT: Token-based authentication for protected routes via the `verifyToken` middleware.

## Folder Structure
- `/controllers`: Contains the logic for handling requests (Task and Auth).
- `/models`: Defines Mongoose schemas for Tasks and Users.
- `/routes`: Maps URL paths to controller functions.
- `/middleware`: Houses security and authentication logic.

## Setup and Installation

1. Clone the repository:
    git clone <your-repository-url>

2. Install Dependencies:
    npm install express mongoose dotenv helmet bcryptjs jsonwebtoken

3. Environment Variables:
   Create a `.env` file in the root directory and add your credentials:
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    API_KEY=your_secret_api_key
    JWT_SECRET=your_jwt_signing_secret

4. Start the Server:
    node server.js

## API Documentation & Testing

### 1. Authentication
- POST `/api/auth/register` (Body: {"username": "doe", "password": "doe"})
- POST `/api/auth/login` (Body: {"username": "doe", "password": "doe"})

### 2. Tasks (Protected)
Note: All routes below require the header `x-api-key` and `Authorization: Bearer <token>`.

- GET `/api/tasks` : Retrieve all tasks
- POST `/api/tasks` : Create a new task
- PUT `/api/tasks/:id` : Update a task
- DELETE `/api/tasks/:id` : Remove a task

## Maintenance & Audit
To ensure the server meets the lab's security requirements:
- Security Audit: Run `npm audit`
- Update Packages: Run `npm update`
- Disable Signature: `app.disable('x-powered-by')` is active in `server.js`.