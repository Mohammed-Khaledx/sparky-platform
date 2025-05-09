// here i should get a node table from the model and the model should requre the mongoose
// so i could use mongo function while get and post

// const mongoose = require("mongoose");

const User = require("../models/user_model");
const Follow = require("../models/follow_model");

// for uplaod images
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises; // For deleting files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    ); // Add file extension
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload only images."), false);
    }
  },
});

// CREATE
// replaced by register
let createUser = async (req, res) => {
  // try {
  //   const user = new User(req.body);
  //   const newUser = user.save(user);
  //   res.status(201).json(newUser);
  //   console.log("user created OK!");
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
};

// READ
let getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find()
      .select("-password -__v")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await User.countDocuments();
    
    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
};

// not needed
// let getUserByName = async (req, res) => {
//   try {
//     let name = req.params.name;
//     const wantedUser = await User.findOne({ name: req.params.name });
//     if (!wantedUser) {
//       return res.status(404).json({
//         status: "error",
//         message: "User not found",
//       });
//     }
//     res.status(200).json(wantedUser);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

let getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from params
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Use userId instead of undefined 'id'
    const followersCount = await Follow.countDocuments({ following: userId });
    const followingCount = await Follow.countDocuments({ follower: userId });

    res.status(200).json({
      user,
      followersCount,
      followingCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
let updateUser = async (req, res) => {
  // req has the data of the logged in user from auth middelware

  const { userId } = req.user; // Extract user ID from auth middleware
  if (req.params.id !== userId) {
    return res
      .status(403)
      .json({ message: "You can only update your own profile" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Allow updating multiple fields
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update profile picture
const updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Store complete URL
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    if (user.profilePicture && user.profilePicture.url) {
      const oldPath = user.profilePicture.url.split("/uploads/")[1];
      if (oldPath) {
        await fs.unlink(path.join(__dirname, "../uploads", oldPath));
      }
    }

    user.profilePicture = { url: imageUrl };
    await user.save();

    res.json({
      message: "Profile picture updated",
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  getUserById,
  updateUser,
  // uplaod is multer instance
  // for image upload
  upload,
  updateProfilePicture,
  deleteUser,
};
