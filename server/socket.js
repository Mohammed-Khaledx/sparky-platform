// socket.js
const { Server } = require("socket.io");

// In-memory map to track active users
// this will be a userid as a key and array of its devices socket id
// in case he is opening from more than one device

// TODO 
// Future improvement:
// Replace in-memory `activeUsers` with Redis for distributed and scalable user tracking.
// Redis can store userId as the key and a list of socketIds as the value.

const activeUsers = new Map();

function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",// the origin should be the frontend url
      methods: ["GET", "POST"],
      credentials: true 
    },
  });

  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // Authentication middleware for socket
    const token = socket.handshake.auth.token;
    let userId;

    try {
      const jwt = require("jsonwebtoken");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;

      // Add socket to the activeUsers map
      if (!activeUsers.has(userId)) {
        activeUsers.set(userId, []);
      }
      activeUsers.get(userId).push(socket.id);

      console.log(`User ${userId} connected. Active users:`, activeUsers);
    } catch (err) {
      console.log("Invalid or missing token:", err.message);
      socket.disconnect();
      return;
    }

    // Handle socket disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      if (userId && activeUsers.has(userId)) {
        const userSockets = activeUsers.get(userId).filter((id) => id !== socket.id);
        if (userSockets.length > 0) {
          activeUsers.set(userId, userSockets);
        } else {
          activeUsers.delete(userId); // Remove user if no active sockets
        }
        console.log(`Updated active users:`, activeUsers);
      }
    });
  });

  return io;
}

// Helper function to emit events
function emitToUser(io, userId, event, data) {
  if (activeUsers.has(userId)) {
    activeUsers.get(userId).forEach((socketId) => {
      io.to(socketId).emit(event, data);
    });
  }
}

module.exports = { initializeSocket, emitToUser };
