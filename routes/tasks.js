const express = require("express");
const router = express.Router();

const taskController = require("../controllers/tasks");

// // Define routes for task-related operations
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.get("/user/:userId/tasks", taskController.getTasksByUserId); // get tasks by user ID
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
