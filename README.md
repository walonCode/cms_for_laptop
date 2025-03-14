# CMS For Laptop

A full-stack web application designed to manage laptop distribution efficiently. The project is built using React, TailwindCSS, Redux Toolkit, and Axios on the client side, and Node.js, Express, JWT, and MongoDB on the server side.

## Features

- **Authentication & Authorization**: Secure login and role-based access control using JWT and Passport.js.
- **State Management**: Redux Toolkit for efficient state handling.
- **Responsive UI**: Styled with TailwindCSS for a modern and responsive design.
- **API Communication**: Axios for seamless API requests.
- **Database**: MongoDB for scalable and flexible data storage.
- **Middleware & Security**: CORS for cross-origin requests and JWT for token-based authentication.
- **Development Tools**: Nodemon for automatic server restarts during development.
- **Laptop & Allocation Management**: Routes and controllers to manage laptops and their allocations.

## Tech Stack

### **Client** (Frontend)
- React.js
- TailwindCSS
- Redux Toolkit
- Axios

### **Server** (Backend)
- Node.js
- Express.js
- Custom made Auth
- JWT (JSON Web Token)
- MongoDB
- CORS (Cross-Origin Resource Sharing)
- Nodemon (Development Only)
- Zod (Data validation)

## Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Clone the Repository**
```sh
git clone https://github.com/walonCode/cms_for_laptop.git
cd cms_for_laptop
```

### **Backend Setup**
```sh
cd server
npm install
```

#### **Create a `.env` file**
```env
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URI=your-database-uri
```

#### **Run the Server**
```sh
npm run dev  # Starts the server with nodemon
```

### **Frontend Setup**
```sh
cd client
npm install
```

#### **Run the Client**
```sh
npm run dev
```

## API Routes

### **Authentication**
- `POST /api/users/register` → Register a new user
- `POST /api/users/login` → Authenticate and return JWT


### **User Routes**
- `GET /api/users` → Get all users (Protected, Admin)
- `GET /api/users/:id` → Get a specific user

### **Laptop Routes**
- `POST /api/laptops` → Add a new laptop (Admin Only)
- `GET /api/laptops` → Get all laptops
- `PATCH /api/laptops/:id` → Update laptop details (Facilitator Only)
- `DELETE /api/laptops/:id` → Delete a laptop (Admin Only)

### **Allocation Routes**
- `POST /api/allocations/:laptopId/:userId` → Allocate a laptop
- `GET /api/allocations` → Get all allocations
- `PATCH /api/allocations/:id/:laptopId/:userId` → Update allocation
- `DELETE /api/allocations/:id` → Delete an allocation

## Folder Structure

```
cms_for_laptop/
│── client/            # Frontend React app
│   ├── components/    # UI components
│   ├── stores/        # Redux store & slices
│   ├── assets/        # Static assets (images, styles, etc.)
│── server/            # Backend Node.js/Express API
│   ├── src/           # All backend source files
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # Express route handlers
│   │   ├── middleware/ # Authentication & authorization middleware
│   │   ├── controllers/ # Business logic for routes
│   │   ├── config/     # Database and other configurations
│   │   ├── helpers/    # Utility functions
│── .env.example        # Example Environment variables
│── package.json       # Dependencies and scripts
│── LICENSE.txt        # License file
│── README.md          # Documentation
```

## License
This project is licensed under the [License](license.txt).

