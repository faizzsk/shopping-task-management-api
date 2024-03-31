const Logger = require("../utils/logger");

function loggingMiddleware(req, res, next) {
  console.log("--Middleware--loggingMiddleware");

  Logger.info(`[${new Date().toUTCString()} -> ${req.method} -> ${req.url}]`);

  next();
}

module.exports = loggingMiddleware;
