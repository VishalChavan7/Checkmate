const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let playerRole = null;
let draggedPiece = null;

const PIECES = {
  w: {
    p: "♙",
    n: "♘",
    b: "♗",
    r: "♖",
    q: "♕",
    k: "♔",
  },
  b: {
    p: "♟",
    n: "♞",
    b: "♝",
    r: "♜",
    q: "♛",
    k: "♚",
  },
};

function renderBoard() {
  boardElement.innerHTML = "";
  const board = chess.board();

  // Add or remove 'flipped' class based on player role
  if (playerRole === "b") {
    boardElement.classList.add("flipped");
  } else {
    boardElement.classList.remove("flipped");
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      const squareColor = (row + col) % 2 === 0 ? "light" : "dark";
      square.className = `square ${squareColor}`;
      square.dataset.square = `${String.fromCharCode(97 + col)}${8 - row}`;

      const piece = board[row][col];
      if (piece) {
        const pieceDiv = document.createElement("div");
        pieceDiv.className = `piece ${piece.color}`;
        pieceDiv.textContent = PIECES[piece.color][piece.type.toLowerCase()];

        if (playerRole === piece.color && playerRole === chess.turn()) {
          pieceDiv.draggable = true;
          pieceDiv.addEventListener("dragstart", handleDragStart);
        }

        square.appendChild(pieceDiv);
      }

      square.addEventListener("dragover", (e) => e.preventDefault());
      square.addEventListener("drop", handleDrop);
      boardElement.appendChild(square);
    }
  }
}

function handleDragStart(e) {
  draggedPiece = e.target;
  e.dataTransfer.setData("text/plain", "");
}

function handleDrop(e) {
  e.preventDefault();
  if (!draggedPiece) return;

  const sourceSquare = draggedPiece.parentNode.dataset.square;
  const targetSquare = e.target.classList.contains("square")
    ? e.target.dataset.square
    : e.target.parentNode.dataset.square;

  if (sourceSquare === targetSquare) return;

  const move = {
    from: sourceSquare,
    to: targetSquare,
    promotion: "q",
  };

  socket.emit("move", move);
}

// Socket event handlers
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("playerRole", (role) => {
  console.log("Assigned role:", role);
  playerRole = role;
  renderBoard();
});

socket.on("spectatorRole", () => {
  console.log("Assigned as spectator");
  playerRole = null;
  renderBoard();
});

socket.on("boardState", (fen) => {
  console.log("Received board state:", fen);
  chess.load(fen);
  renderBoard();
});

socket.on("move", (move) => {
  console.log("Move received:", move);
  chess.move(move);
  renderBoard();
});

socket.on("invalidMove", (reason) => {
  console.log("Invalid move:", reason);
});

// Initial render
renderBoard();
