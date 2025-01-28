const Post = require("../models/post_model");
const User = require("../models/user_model");
const Notification = require("../models/notification_model");

const { io } = require("../index"); // Import the io instance
const { emitToUser } = require("../socket/socket");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, images } = req.body;

    const newPost = new Post({
      content,
      author: req.user.userId,
      images: images || [],
    });

    const post = await newPost.save();

    // Populate author details
    await post.populate("author", "name profilePicture");

    res.status(201).json(post);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts with pagination
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture")
      .populate("sparks", "name")
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// Spark (React) to a post
exports.sparkPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.userId;
    const isSparked = post.sparks.includes(userId);

    if (isSparked) {
      // Remove spark
      post.sparks = post.sparks.filter((id) => id.toString() !== userId);
    } else {
      // Add spark
      post.sparks.push(userId);
    }

    await post.save();

    // Repopulate sparks with user details this mean to extract info from user id
    // who sparked the post and pot it in the sparks array

    const populatedData = await post.populate("sparks", "name profilePicture");

    // as this function may remove or add the spark reaction make sure dont recive
    // the notification for unspark just the spark
    // notification
    if (!isSparked) {
      // extracting the name of the user
      const { name } = await User.findById(userId);
      // we also canuse this for name
      populatedData.sparks[0].name;

      emitToUser(
        post.author.toJSON(),
        "notification",
        name + " sparked your post",
        io
      );
    }
    await Notification.create({
      recipient: post.author, // Post owner's ID
      sender: req.user.userId,
      type: isSparked ? "unspark" : "spark",
      message: isSparked ? "unSparked successfully" : "Sparked successfully",
      target: Post._id,
      targetModel: "Post",
    });

    res.status(201).json({
      message: isSparked ? "unSparked successfully" : "Sparked successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error sparking post", error: error.message });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // from token auth
    const userId = req.user.userId
    const newComment = {
      user: userId,
      content,
    };

    post.comments.unshift(newComment);
    await post.save();

    // // Populate comment with user details
    // const populatedData = await post.populate(
    //   "comments.user",
    //   "name content"
    // );

    await Notification.create({
      recipient: post.author, // Post owner's ID
      sender: userId,
      type: "comment",
      message: "commented on your post.",
      target: Post.id,
      targetModel: "Post",
    });




    const {name } = await User.findById(userId)

    emitToUser(
      post.author.toJSON(),
      "notification",
      name + " sparked your post",
      io
    );

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding comment", error: error.message });
  }
};

// Get single post with full details
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name profilePicture")
      .populate("sparks", "name profilePicture")
      .populate({
        path: "comments.user",
        select: "name profilePicture",
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};
