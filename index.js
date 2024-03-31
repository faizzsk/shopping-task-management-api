require("dotenv").config(); //
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const loggingMiddleware = require("./src/middleware/logging.middleware");

const app = express();

// // Connect to MongoDB
connectDB();

// // Middleware
app.use(express.json());
app.use(cookieParser());
app.use(loggingMiddleware);

// // Routes
app.use("/api/auth", require("././src/routes/auth.route"));
app.use("/api/tasks", require("././src/routes/task.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
module.exports = app;
