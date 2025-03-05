# CMS For Laptop - Server

This is the backend for the **CMS For Laptop** project, built using Node.js, Express, MongoDB, and JWT authentication. It provides RESTful APIs for laptop management, user authentication, and allocation handling.

## Features
- **Authentication & Authorization**: Secure login using JWT and Passport.js
- **Role-Based Access Control**: Restricts actions based on user roles (Admin, Facilitator, etc.)
- **CRUD Operations**: Manage laptops, users, and allocations efficiently
- **Middleware**: Implements authentication, error handling, and security features
- **MongoDB Integration**: Stores and retrieves data using Mongoose ORM
- **CORS Support**: Allows cross-origin requests for frontend communication
- **Nodemon for Development**: Auto-restarts the server on code changes

## Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **JWT (JSON Web Token)** - Secure authentication
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Development tool for automatic restarts

## Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### **Clone the Repository**
```sh
git clone https://github.com/walonCode/cms_for_laptop.git
cd cms_for_laptop/server
```

### **Install Dependencies**
```sh
npm install
```

### **Environment Variables**
Create a `.env` file in the `server` directory and add the following:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
EXPRESS_SESSION_SECRET=your-express-session-secret
```

### **Run the Server**
```sh
npm run dev  # Starts the server with nodemon
```

## API Routes

### **Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Authenticate user and return JWT
- `GET /api/auth/me` → Get current authenticated user (Protected)

### **User Routes**
- `GET /api/users` → Get all users (Admin only)
- `GET /api/users/:id` → Get a specific user

### **Laptop Routes**
- `POST /api/laptops` → Add a new laptop (Admin only)
- `GET /api/laptops` → Get all laptops
- `PATCH /api/laptops/:id` → Update laptop details (Facilitator only)
- `DELETE /api/laptops/:id` → Delete a laptop (Admin only)

### **Allocation Routes**
- `POST /api/allocations/:laptopId/:userId` → Allocate a laptop to a user
- `GET /api/allocations` → Get all allocations
- `DELETE /api/allocations/:id` → Delete an allocation
- `PATCH /api/allocations/:id/:laptopId/:userId` → Update allocation details

## Folder Structure
```
cms_for_laptop/server/
│── src/
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middleware/    # Authentication & authorization middleware
│   ├── controllers/   # Business logic for API routes
│   ├── config/        # Configuration files (DB connection, etc.)
│   ├── helpers/       # Utility functions
│   ├── server.js      # Main server file
│   ├── index.js       # Entry point
│── .env               # Environment variables
│── package.json       # Dependencies and scripts
│── LICENSE.txt        # License file
│── README.md          # Documentation
```

## License
This project is licensed under the [License](../license.txt).



