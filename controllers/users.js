const mongodb = require("../data/database");

// Import ObjectId from mongodb to handle MongoDB Object IDs
const ObjectId = require("mongodb").ObjectId;

// Function to get all users
const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users'];
  try {
    const result = await mongodb.getDb().db().collection("users").find();
    const users = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  //#swagger.tags = ['Users'];
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({ _id: userId });

    const users = await result.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new User
const createUser = async (req, res) => {
  //#swagger.tags = ['Users'];
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .insertOne(user);

    if (result.acknowledged) {
      res
        .status(201)
        .send({ message: "User created successfully", id: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a User by ID
const updateUser = async (req, res) => {
  //#swagger.tags = ['Users'];
  try {
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
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users'];
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found or no changes made" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
