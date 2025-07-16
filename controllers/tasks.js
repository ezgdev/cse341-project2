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

module.exports = {
  getAllTasks,
};
