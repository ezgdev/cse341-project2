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

const getUserById = async (req, res) => {
  //#swagger.tags = ['Users'];
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

// Create a new User
const createUser = async (req, res) => {
  //#swagger.tags = ['Users'];
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  const result = await mongodb.getDb().db().collection("users").insertOne(user);
  if (result.acknowledged) {
    res
      .status(201)
      .send({ message: "User created successfully", id: result.insertedId });
  } else {
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Update a User by ID
const updateUser = async (req, res) => {
  //#swagger.tags = ['Users'];
  const userId = new ObjectId(req.params.id);
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (result.modifiedCount > 0) {
    res.status(200).send({ message: "User updated successfully" });
  } else {
    res.status(404).json({ message: "User not found or no changes made" });
  }
};

// Delete a User by ID
const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users'];
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .deleteOne({ _id: userId });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: "User delete successfully" });
  } else {
    res.status(404).json({ message: "User not found or no changes made" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
