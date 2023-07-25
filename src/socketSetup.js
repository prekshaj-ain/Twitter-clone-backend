const { Server } = require("socket.io");
const { toggleLike } = require("./listeners/tweet-listener");

const configureSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:1234",
      credentials: true,
      optionSuccessStatus: 200,
    },
  });

  // Configure Socket.IO events and logic here
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle Socket.IO events and logic here
    socket.on("toggleLike", ({ tweetId, userId, modelType }) => {
      toggleLike(io, tweetId, userId, modelType);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = configureSocketIO;
