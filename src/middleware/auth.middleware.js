const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const BlacklistedToken = require("../models/Token");
const Logger = require("../utils/logger");
const { sendErrorResponse } = require("../utils/response/error.response");

exports.verifyToken = async (req, res, next) => {
  Logger.verbose("[auth.middleware.js] -> verifyToken ]");
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return sendErrorResponse(res, 401, "Unauthorize");
  }

  try {
    console.log("here ");
    const isTokenBlacklisted = await BlacklistedToken.exists({
      token: token.replace("Bearer ", ""),
    });
    if (isTokenBlacklisted) {
      return sendErrorResponse(res, 403, "Forbidden");
    } else {
      const decoded = jwt.verify(
        token?.replace("Bearer ", ""),
        authConfig.secret
      );
      console.log("dec", decoded);
      req.user = decoded;
      next();
    }
  } catch (err) {
    console.log(err, "err");
    return sendErrorResponse(res, 401, "Session Expired");

    // return res.status(401).json({ error: "Session Expired" });
  }
};
