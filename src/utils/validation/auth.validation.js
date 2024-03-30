const { body } = require('express-validator');
const User = require('../../models/User');


exports.validateRegistration = [
  body('username').trim()
  .notEmpty().withMessage('Username is required').custom(value => !/\s/.test(value)).withMessage('Username cannot contain spaces'),
  
  body('password').notEmpty().withMessage('Password is required') ,

  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),

  body('username').custom(async (value) => {
    const user = await User.findOne({ username: value.toLowerCase() });
    if (user) {
      return Promise.reject('Username already exists');
    }
  })
];


exports.validateLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  
  ];
  
