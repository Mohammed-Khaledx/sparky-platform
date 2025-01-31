const Message = require("../models/Message");

// in all of this function you may realize that
// all senderid is extrated from req.user.id
// and all of this came from JWT auth middle-ware

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id; // Extract from JWT

    if (!receiverId || !message) {
      return res
        .status(400)
        .json({ error: "Receiver ID and message are required" });
    }

    // Save message to database
    const newMessage = await Message.create({ senderId, receiverId, message });
    return res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get conversation between two users
const getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Update message status to "seen"
const markMessagesAsSeen = async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user.id;

    await Message.updateMany(
      { senderId, receiverId, read: false },
      { read: true }
    );

    res.status(200).json({ message: "Messages marked as seen" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update message status" });
  }
};

module.exports = { sendMessage, getMessages, markMessagesAsSeen };
