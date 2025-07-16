const mongodb = require("../data/database");

// Import ObjectId from mongodb to handle MongoDB Object IDs
const ObjectId = require("mongodb").ObjectId;

// Function to get all users
const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users'];
  const result = await mongodb.getDb().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

module.exports = {
  getAllUsers,
};
