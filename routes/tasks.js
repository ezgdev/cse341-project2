const express = require("express");
const router = express.Router();

const taskController = require("../controllers/tasks");

// // Define routes for task-related operations
router.get("/", taskController.getAllTasks);
// router.get("/tasks/:id", taskController.getTaskById);
// router.post("/tasks", taskController.createTask);
// router.put("/tasks/:id", taskController.updateTask);
// router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
