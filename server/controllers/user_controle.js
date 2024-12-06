// here i should get a node table from the model and the model should requre the mongoose
// so i could use mongo function while get and post

// const mongoose = require("mongoose");

const User = require("../models/user_model");

// CREATE
let createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = user.save(user);
    res.status(201).json(newUser);
    console.log("user created OK!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ
let getAllUsers = async (req, res) => {
  console.log("get Notes by controller throw routes finally in indexjs");
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

let getUserByName = async (req, res) => {
  try {
    let name = req.params.name;
    const wantedUser = await User.findOne({ name: req.params.name });
    if (!wantedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json(wantedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// UPDATE
let updateUser = async (req, res) => {
  try {
    let selectedUser = req.params.name;
    let newData = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      // option object that true for return the new object
      // and run the validation throw the schema
      {
        new: true,
        runValidators: true,
      }
    );
    if (!newUser) {
      throw new Error("User not found");
    }
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
let deleteUser = async (req, res) => {
  try {
    const isDeleted = await User.findByIdAndDelete(req.params.id);
    if (!isDeleted) {
      return res.status(404).json("user not found");
    }
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByName,
  updateUser,
  deleteUser,
};
