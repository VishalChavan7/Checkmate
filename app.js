const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {
  white: null,
  black: null,
};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Assign role to player
  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
    console.log("White player assigned:", socket.id);
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
    console.log("Black player assigned:", socket.id);
  } else {
    socket.emit("spectatorRole");
    console.log("Spectator connected:", socket.id);
  }

  // Send current board state to new player
  socket.emit("boardState", chess.fen());

  socket.on("move", (moveData) => {
    console.log("Move received:", moveData);
    const playerColor = socket.id === players.white ? "w" : "b";

    // Verify it's the player's turn
    if (
      (playerColor === "w" && chess.turn() === "b") ||
      (playerColor === "b" && chess.turn() === "w")
    ) {
      socket.emit("invalidMove", "Not your turn");
      return;
    }

    try {
      const move = chess.move(moveData);
      if (move) {
        io.emit("move", moveData);
        io.emit("boardState", chess.fen());
        console.log("Move successful:", move);
      } else {
        socket.emit("invalidMove", "Invalid move");
      }
    } catch (error) {
      console.error("Error making move:", error);
      socket.emit("invalidMove", "Error processing move");
    }
  });

  socket.on("disconnect", () => {
    if (socket.id === players.white) {
      players.white = null;
      console.log("White player disconnected");
    } else if (socket.id === players.black) {
      players.black = null;
      console.log("Black player disconnected");
    }
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
