const { body } = require("express-validator");

exports.validateTaskCreation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),
   
  body("status")
    .notEmpty()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage(
      "Status is required and should be pending, In Progress or Completed"
    ),
];
