const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Set view engine to Pug
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public")); // For serving static files


const User = require('./models/user_model')
app.get("/", async(req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    console.log(users)
    res.render('index', { title: 'User List', users }); // Pass users to the view
} catch (err) {
  console.error(err);
  res.status(500).send('Server Error');
}
});


async function mongoConnect() {
  try {
    const state = await mongoose.connect("mongodb://127.0.0.1:27017/sparky_platfrom_db");
    console.log("db connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
mongoConnect();

app.listen("3000", () => {
  console.log("server started successfully");
});

// use the middelware
app.use(express.json());

// setup routes
const user_route = require("./routes/userRoute");
app.use("/users", user_route);


const followOrUnfollow_Route = require("./routes/followOrUnfollowRoute");
app.use("/followOrUnfollow", followOrUnfollow_Route);

const post_route = require("./routes/postRoute");
app.use("/posts", post_route);


const notification_route = require("./routes/notificationRoute");
app.use("/notifications", notification_route);



// 404 Not Found Middleware
app.use((req, res, next) => {
  console.log(`404 Error: ${req.method} ${req.url} not found`); // Log before sending response
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
    path: req.originalUrl,
  });
});

// Global Error Handler (should be last middleware)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// from server connect to routes throw specific route path "./path"
// then go to the route then import express to use the requests [get ,post]
//

