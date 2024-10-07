Here’s the complete README file formatted for direct copy-pasting:

# Checkmate - A Real-Time Chess Game

**Checkmate** is a real-time, multiplayer chess game that allows players to challenge each other in an engaging and interactive way. It’s built using **Socket.io** for real-time communication and **Chess.js** to handle the core game logic. The game supports both white and black players, as well as spectators, all in real-time.

## Features

- Real-time multiplayer chess using WebSockets.
- Drag-and-drop functionality for easy piece movement.
- Role assignment: Players automatically get assigned as either white or black based on availability. Additional users become spectators.
- Automatic board flipping for the black player.
- Live updates of the board state for all connected clients.
  
## Tech Stack

- **Frontend:** 
  - HTML, CSS, JavaScript
  - Socket.io for real-time communication
  - Chess.js for game logic
  - EJS for templating

- **Backend:**
  - Node.js
  - Express.js for server management
  - Socket.io for handling WebSocket communication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/checkmate.git

	2.	Navigate into the project directory:

cd checkmate


	3.	Install dependencies:

npm install


	4.	Start the server:

node app.js


	5.	Open your browser and navigate to http://localhost:3000 to start playing.

How It Works

Frontend

	•	Socket.io Initialization:
Establishes WebSocket connection to the server using Socket.io (const socket = io();).
	•	Chess Game Initialization:
An instance of the Chess.js library is created to manage the game logic (const chess = new Chess();).
	•	DOM Elements:
Selects the HTML element with the class "chessboard" to render the chessboard (const boardElement = document.querySelector(".chessboard");).
	•	Drag-and-Drop Functionality:
Implements drag-and-drop functionality for moving chess pieces on the board. Pieces are draggable only if it’s the player’s turn. Event listeners for drag start, drag end, drag over, and drop events are attached to handle drag-and-drop interactions.
	•	Board Rendering:
Generates the HTML representation of the chessboard based on the current game state. It iterates over the board array and creates square elements for each cell, appending piece elements to occupied squares.
	•	Handling Moves:
Handles player moves when dragging and dropping pieces. Constructs a move object containing the source and target squares in algebraic notation, then emits a "move" event to the server via Socket.io.
	•	Unicode Chess Pieces:
Returns Unicode characters representing chess pieces based on their type.
	•	Socket.io Event Handlers:
Listens for various events from the server, such as player role assignment, spectator role assignment, board state updates, and opponent moves. Updates the local game state and renders the board accordingly when receiving events.
	•	Initial Rendering:
Calls the renderBoard function to render the initial state of the chessboard.

Backend

	•	Server Initialization:
	•	Imports necessary libraries: express, http, socket.io, and chess.js.
	•	Creates an Express app instance and initializes the HTTP server with Socket.io.
	•	Creates a Chess object instance from chess.js.
	•	Game State Management:
	•	Manages connected players using a players object that tracks socket IDs and player roles (white/black).
	•	Tracks the current player’s turn.
	•	Express Configuration:
	•	Configures Express to use the EJS templating engine.
	•	Serves static files from the public directory.
	•	Defines a route for the root URL to render the "index" EJS template.
	•	Socket.io Handling:
	•	Handles client connections and assigns roles based on availability. If both slots are filled, assigns additional users as spectators.
	•	Emits events such as "playerRole" for players and "spectatorRole" for spectators.
	•	Sends the initial board state using FEN notation when a new player connects.
	•	Move Handling:
	•	Listens for "move" events from the client. If the move is valid and it’s the correct player’s turn, updates the game state and broadcasts the move and the new board state to all clients. If invalid, logs an error.
	•	Client Disconnection:
	•	Handles client disconnection by removing the player’s assigned role and freeing up the slot for new players.

Dependencies

	•	Chess.js: A library for chess move generation and validation.
	•	Socket.io: Real-time communication for multiplayer functionality.
	•	Express: Web framework for Node.js.
	•	EJS: Embedded JavaScript templating for the frontend.

Usage

	•	Start a Game:
The first two players to connect are automatically assigned as white and black. Any additional users are assigned as spectators.
	•	Make a Move:
Simply drag a piece to its destination square. The board will update in real-time for all players.

License

This project is licensed under the ISC License.

Author

Developed by Vishal Chavan.
