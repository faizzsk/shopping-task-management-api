# Shopping Portal API

This repository contains the source code for a simple shopping portal project with RESTful API developed using Node.js and Express.

## Technologies Used

- Node.js
- Express
- MongoDB
- Docker

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/faizzsk/shopping-task-management-api.git
   ```

2. Navigate into the project directory:

   ```bash
   cd shopping-task-management-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your database:

   - **MongoDB**: Ensure MongoDB is installed and running.
   
5. Start the server:

   ```bash
   npm run start
   ```

### Running with Docker

To run the application using Docker, follow these steps:

1. Install Docker on your machine if you haven't already.
2. Navigate to the root directory of the project.
3. Build and run the Docker image by running the following command in your terminal:
   ```bash
   docker-compose up --build
   ```

## API Endpoints

**Base URL : https://localhost:3000**

### Authentication Endpoints

1. #### `POST /api/auth/register`

**Description:** 
Register a new user by providing user details.

**Request Body:**
- username: String (required)
- password: String (required)

2. #### `POST /api/auth/login`

**Description:** 
Login with username and password to obtain a JWT token.

**Request Body:**
- username: String (required)
- password: String (required)


3. #### `POST /api/auth/logout`

**Description:** 
Logout the currently authenticated user.

**Authorization Header:**
- Bearer Token: JWT token obtained during login (required)


### Task Management Endpoints

1. #### `POST /api/tasks`

**Description:** 
Create a new task for the authenticated user.

**Authorization Header:**
- Bearer Token: JWT token obtained during login (required)

**Request Body:**
- title: String (required)
- description: String
- status: String
  

2. #### `GET /api/tasks/:id`

**Description:** 
Get a specific task by ID.

**Authorization Header:**
- Bearer Token: JWT token obtained during login (required)

3. #### `GET /api/tasks`

**Description:** 
Get all tasks for the authenticated user.

**Query Parameters:**
- sortBy: String (optional) - Field to sort tasks by.
- sortOrder: Number (optional) - Sort order (1 for ascending, -1 for descending).
- search: String (optional) - Search query to filter tasks by title, description, or status.
- page: Number (optional) - Page number for pagination.
- limit: Number (optional) - Number of tasks per page.

**Authorization Header:**
- Bearer Token: JWT token obtained during login (required)


4. #### `PUT /api/tasks/:id`

**Description:** 
Update an existing task by ID.

**Authorization Header:**
- Bearer Token: JWT token obtained during login (required)

**Request Body:**
- title: String
- description: String
- status: String


5. #### `DELETE /api/tasks/:id`

**Description:** 
Delete a task by ID.

**Authorization Header:**
- Bearer Token: JWT token obtained during login (required)

## Contact Information

For any inquiries or assistance, please contact:

- Email: faizshaikh8494@gmail.com
- Phone: 9028925229
