const express = require("express");
const user_route = express.Router();

// import the function from the controller
const {
  createUser,
  getAllUsers,
  getUserByName,
  updateUser,
  deleteUser,
} = require("../controllers/user_controle");
const { register, login } = require("../controllers/auth_controller");

// user_route.post("/", createUser);
user_route.get("/", getAllUsers);

user_route.get("/:name", getUserByName);

user_route.put("/:id", updateUser);

user_route.delete("/:id", deleteUser);


user_route.post("/register", register);

user_route.post("/login", login);

module.exports = user_route;
