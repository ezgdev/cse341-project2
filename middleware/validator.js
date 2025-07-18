const express = require("express");
const { body, param, validationResult } = require("express-validator");

const validate = {};

// Validation rules for user-related operations
validate.usersRules = () => {
  return [
    body("name").notEmpty().withMessage("Username is required"),

    body("email").isEmail().withMessage("Email must be a valid email address"),
  ];
};

// Validation rules for user ID
validate.usersIdRules = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid user ID"),
  ];
};

// Validation rules for task-related operations
validate.tasksRules = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status").notEmpty().withMessage("Status is required"),
    body("priority").notEmpty().withMessage("Priority is required"),
    body("dueDate").isISO8601().withMessage("Due date must be a valid date"),
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid user ID"),
  ];
};

// Validation rules for task ID
validate.tasksIdRules = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Task ID is required")
      .isMongoId()
      .withMessage("Invalid task ID"),
  ];
};

// Middleware to handle validation errors
validate.handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
