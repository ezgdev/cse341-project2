const mongodb = require("../data/database");

// Import ObjectId from mongodb to handle MongoDB Object IDs
const ObjectId = require("mongodb").ObjectId;

// Function to get all users
const getAllTasks = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  const result = await mongodb.getDb().db().collection("task").find();
  result.toArray().then((task) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(task);
  });
};

// Function to get a task by ID
const getTaskById = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  const taskId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("task")
    .find({ _id: taskId });
  result.toArray().then((task) => {
    if (task.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(task[0]);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });
};

// Create a new Task
const createTask = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    userId: new ObjectId(req.body.userId),
  };
  const result = await mongodb.getDb().db().collection("task").insertOne(task);
  if (result.acknowledged) {
    res
      .status(201)
      .send({ message: "Task created successfully", id: result.insertedId });
  } else {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Update a Task by ID
const updateTask = async (req, res) => {
  //#swagger.tags = ['Tasks'];
  const taskId = new ObjectId(req.params.id);
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
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
};

// Delete a Task by ID
const deleteTask = async (req, res) => {
  //#swagger.tags = ['Tasks'];
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
};

// Get tasks by user ID
const getTasksByUserId = async (req, res) => {
  //#swagger.tags = ['Tasks']
  const userId = req.params.userId;
  const result = await mongodb
    .getDb()
    .db()
    .collection("task")
    .find({ userId: new ObjectId(userId) });
  result.toArray().then((tasks) => {
    res.setHeader("Content-Type", "application/json");
    res.json(tasks);
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByUserId,
};
