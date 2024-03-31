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

   - **MongoDB**: Ensure MongoDB is installed and running. Update the database configuration in `config/db.config.js`.
   
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

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login with username and password to obtain a JWT token.
- `POST /api/auth/logout`: Logout the currently authenticated user.

### Task Management

- `GET /api/tasks`: Get all tasks for the authenticated user.
- `GET /api/tasks/:id`: Get a specific task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task by ID.
- `DELETE /api/tasks/:id`: Delete a task by ID.

## Contact Information

For any inquiries or assistance, please contact:

- Email: faizshaikh8494@gmail.com
- Phone: 9028925229
