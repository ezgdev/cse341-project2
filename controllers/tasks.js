const mongodb = require("../data/database");

// Import ObjectId from mongodb to handle MongoDB Object IDs
const ObjectId = require("mongodb").ObjectId;

// Get all tasks
const getAllTasks = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  try {
    const result = await mongodb.getDb().db().collection("task").find();
    const tasks = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting all tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  try {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("task")
      .find({ _id: taskId });
    const tasks = await result.toArray();

    if (tasks.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(tasks[0]);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      userId: new ObjectId(req.body.userId),
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("task")
      .insertOne(task);

    if (result.acknowledged) {
      res
        .status(201).json(result)
        .send({ message: "Task created successfully", id: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create task" });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update task by ID
const updateTask = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  try {
    const taskId = new ObjectId(req.params.id);
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      userId: new ObjectId(req.body.userId),
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("task")
      .replaceOne({ _id: taskId }, task);

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete task by ID
const deleteTask = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  try {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("task")
      .deleteOne({ _id: taskId });

    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get tasks by user ID
const getTasksByUserId = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  try {
    const userId = new ObjectId(req.params.userId);
    const result = await mongodb
      .getDb()
      .db()
      .collection("task")
      .find({ userId });
    const tasks = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks by user ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByUserId,
};
