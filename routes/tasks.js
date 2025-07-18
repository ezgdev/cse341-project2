const express = require("express");
const router = express.Router();
const validate = require("../middleware/validator");

const taskController = require("../controllers/tasks");

// // Define routes for task-related operations
router.get("/", validate.tasksIdRules(), taskController.getAllTasks);

router.get(
  "/:id",
  validate.tasksIdRules(),
  validate.handleErrors,
  taskController.getTaskById
);

router.get(
  "/user/:userId/tasks",
  validate.tasksByUserIdRules(),
  validate.handleErrors,
  taskController.getTasksByUserId
); // get tasks by user ID

router.post(
  "/",
  validate.tasksRules(),
  validate.handleErrors,
  taskController.createTask
);

router.put(
  "/:id",
  validate.tasksRules(),
  validate.tasksIdRules(),
  validate.handleErrors,
  taskController.updateTask
);

router.delete(
  "/:id",
  validate.tasksIdRules(),
  validate.handleErrors,
  taskController.deleteTask
);

module.exports = router;
