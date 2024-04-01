# ApiValidator

ApiValidator is a project aimed at developing a RESTful API with Express.js, focusing on thorough validation of incoming data for various routes. The project emphasizes the creation of comprehensive unit tests using Jest to ensure effective validation and proper functioning of each part of the API.

## Features

-   Create, Read, Update, and Delete (CRUD) operations for users
-   Thorough validation of incoming data for each operation
-   Detailed unit tests using Jest to validate the API endpoints

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB (with Mongoose for ODM)
-   Jest
-   Zod
-   bcrypt
-   dotenv
-   jsonwebtoken

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/aicha-azr/ApiValidator.git
```

2. Navigate to the project directory:

```bash
   cd ApiValidator
```

3. Install dependencies:

```bash
   npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```bash

NODE_ENV = "<development or production>"
MONGODB_URL = "<your-mongodb-uri>"
PORT = "<your-port>"
ACCESS_TOKEN_PUBLIC_KEY="RS256 public key"
ACCESS_TOKEN_PRIVATE_KEY="RS256 private key"



```

## Usage

-   Once the server is running, you can use tools like Postman or any REST client to interact with the API endpoints.
-   The API provides endpoints for creating, reading, updating, and deleting users. Ensure to provide valid data according to the specified validation rules.

# API Routes

## USERS

#### GET /api/v1/users

#### GET /api/v1/users/:id

#### POST /api/v1/users

#### DELETE /api/v1/users/:id

## Authentication

#### POST /api/auth/login

#### POST /api/auth/logout

## Testing

Unit tests are implemented using Jest. To run the tests, use the following command:

```bash
npm test
```

# POSTMAN

Use the json file to import post man collections to test the api on your own?
