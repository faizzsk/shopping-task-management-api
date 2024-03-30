const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Logger = require("../utils/logger");
const authConfig=require('../../config/auth');
const { exceptions } = require("winston");

// Register User
exports.registerUser = async (username, password) => {
    Logger.verbose("[auth.services.js] -> registerUser ]");
    try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};


// Login User
exports.loginUser = async (username, password) => {
    
    Logger.verbose("[auth.services.js] -> loginUser ]");
  
    const user = await User.findOne({ username:username.toLowerCase() });
    if (!user) {
      let error = new Error("Invalid Username")
      error.statusCode = 400
     
      throw error
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      let error = new Error("Invalid password")
      error.statusCode = 400
     
      throw error
    
      //throw new Error("Invalid password");
    }
    
    const token = jwt.sign({ userId: user._id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
    return {token};
  };
  
