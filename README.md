# Package Management System

A GraphQL-based package management system that supports user authentication, role-based access, and CRUD operations for packages.


## Features

- User Authentication: JWT-based authentication.
- Role-Based Access Control: Regular users can manage their own packages, while admins can manage all packages.
- GraphQL API:
  - Create, read, update, and delete packages.
- Filter packages by expiration date.
- MongoDB Integration: Persistent database storage.

### Prerequisites
Before you start, ensure you have the following installed:

- Node.js (v14 or above)
- npm (v6 or above)
- MongoDB (local or cloud instance)

## Setup Instructions
1. Clone the Repository


    git clone https://github.com/your-repo/package-management.git
    cd package-management


2. Install Dependencies
   

    npm install


3. Environment Variables


    PORT
    JWT_SECRET
    JWT_EXPIRES_IN
    JWT_AUDIENCE
    JWT_ISSUER
    JWT_ALGORITHM
    MONGO_URI
copy .env from .env.example


4. Start the Server


    npm start

The server will start and be accessible at http://localhost:{PORT}/graphql


## Usage Instructions
### Access the GraphQL Playground


Open a browser and navigate to:

    http://localhost:{PORT}/graphql

## GraphQL Examples
### Create a User

```
mutation {
  createUser(input: {
    email: "test@example.com",
    password: "123456",
    role: "user"
  }
  ) {
  id
  email
  role
 }
}
```

### Log in a User

```
mutation {
  loginUser(email: "test@example.com", password: "123456") {
  token
    user {
    id
    email
    role
  }
 }
}
```

### Create a Package

```
mutation {
  createPackage(input: { name: "Basic Plan", description: "Simple package", price: 100, expirationDate: "2025-01-01" }) {
  id
  name
  description
 }
}
```


## Scripts


    npm start: Starts the server
    npm run dev: Starts the server in development mode



