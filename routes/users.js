const express = require("express");
const router = express.Router();
const validate = require("../middleware/validator");
const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

// Define routes for user-related operations
router.get("/",
  validate.usersIdRules(),
  usersController.getAllUsers
);

router.get(
  "/:id",
  validate.usersIdRules(),
  validate.handleErrors,
  usersController.getUserById
);

router.post(
  "/",
  isAuthenticated,
  validate.usersRules(),
  validate.handleErrors,
  usersController.createUser
);

router.put(
  "/:id",
  isAuthenticated,
  validate.usersRules(),
  validate.usersIdRules(),
  validate.handleErrors,
  usersController.updateUser
);

router.delete(
  "/:id",
  isAuthenticated,
  validate.usersIdRules(),
  validate.handleErrors,
  usersController.deleteUser
);

module.exports = router;
