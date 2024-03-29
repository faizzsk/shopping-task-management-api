//import { config } from 'dotenv';
//import connectDB from './config/db.js';
////config();
//import express from 'express'
require("dotenv").config(); //
const express = require("express");
const connectDB = require("./config/db");
const logger  = require("./src/utils/logger");
//const logger = require("./log")
const cookieParser = require("cookie-parser");
// const loggingMiddleware = require("./middleware/logging.middleware");
// const errorHandler = require("./middleware/error.middleware");

const app = express();

// // Connect to MongoDB
connectDB();
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
  
// // Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(loggingMiddleware);
// app.use(errorHandler);

// // Routes
app.use("/api/auth", require("././src/routes/auth.route"));
app.use("/api/tasks", require("././src/routes/task.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
module.exports = app;
