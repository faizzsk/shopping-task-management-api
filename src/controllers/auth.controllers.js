const BlacklistedToken = require("../models/Token");
const authService = require("../services/auth.service");
const Logger = require("../utils/logger");
const { sendErrorResponse } = require("../utils/response/error.response");
const { sendSuccessResponse } = require("../utils/response/sucess.response");
const {
  validateRegistration,
  validateLogin,
} = require("../utils/validation/auth.validation");
const { validationResult } = require("express-validator");

// Register
exports.register = async (req, res) => {
  Logger.verbose("[auth.controllers.js] -> Register ]");

  //Validation
  await Promise.all(
    validateRegistration.map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendErrorResponse(res, 400, errors.array());
  }

  try {
    const { username, password } = req.body;
    await authService.registerUser(username, password);

    sendSuccessResponse(res, "", 201, "User registered succesfully");
  } catch (error) {
    Logger.error("[auth.controllers.js] -> Login ]");
    console.log("err", error);
    sendErrorResponse(res, 500, "Failed to register user");

}
};

// Login
exports.login = async (req, res) => {
  Logger.verbose("[auth.controllers.js] -> Login ]");
  //Validation
  await Promise.all(validateLogin.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.error("[auth.controllers.js] -> Validation Error ]");

    sendErrorResponse(res, 400, errors.array());

  }

  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);

    //setting cookie
    res.cookie("jwtToken", token, { httpOnly: false, secure: false });
    sendSuccessResponse(res, token, 200, "User Logged in succesfully");
  } catch (error) {
    Logger.error("[auth.controllers.js] -> Register ]");
    console.log(error);
    sendErrorResponse(res, 500, "Failed to login");

    //      res.status(500).json({ error: "Failed to login", msg: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  Logger.verbose("[auth.controllers.js] -> Logout ]");

  try {
    // const token = req?.headers?.authorization;
    const token = req?.cookies?.jwtToken.token;
    console.log("token", token);
    // Adding token to blacklist
    const blacklistedToken = new BlacklistedToken({
      token: token,
    });

    await blacklistedToken.save();

    //clear cookie
    res.clearCookie("jwtToken");

    sendSuccessResponse(res, "", 200, "Logout successful");

  } catch (error) {
    Logger.error("[auth.controllers.js] -> Logout ]");

    console.log(error);
    sendErrorResponse(res, 500, "Something went wrong");

  }
};
