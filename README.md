# Checkmate - Real-Time Multiplayer Chess Game

Checkmate is a real-time multiplayer chess game built using **Socket.io** and **Chess.js**, providing an engaging online chess experience similar to chess.com. The game supports two players: one playing as white and the other as black, with additional spectators allowed to observe the game.

## Features

- Real-time multiplayer chess using WebSocket communication via **Socket.io**.
- **Chess.js** logic ensures valid moves, check, checkmate, and stalemate detection.
- Drag-and-drop functionality for smooth piece movement.
- Role assignment (white, black, or spectator) based on player availability.
- Real-time board updates for all players and spectators.
- Flip board functionality for the black player to maintain proper orientation.
- Unicode chess pieces for better visual representation.

## Technologies Used

### Frontend

- **HTML/CSS/JavaScript**: For UI rendering and styling.
- **Socket.io**: For real-time communication between players and the server.
- **Chess.js**: To handle game logic and move validation.
- **EJS**: Templating engine to dynamically render views.

### Backend

- **Node.js & Express**: To handle server requests and routing.
- **Socket.io**: For managing WebSocket connections and real-time game events.

## Getting Started

### Prerequisites
Make sure you have **Node.js** installed on your system.

### Installation
1. Clone the repository:
   
   ```bash
   git clone https://github.com/yourusername/checkmate.git
2. Navigate to the project directory:
   
   ```bash
   cd checkmate
3. Install the required dependencies:
   
   ```bash
   npm install

 ### Running the Application
1. Start the server:
   
   ```bash
   node app.js
3. Open your browser and navigate to:
   
   ```bash
   http://localhost:3000

## How It Works

### Frontend Overview
1. **Socket.io Initialization:** Establish a WebSocket connection to the server using:
   
   ```bash
   const socket = io();
2. **Chess Game Initialization:** Create a new chess game instance:
   
   ```bash
   const chess = new Chess();

3. **Rendering the Chessboard:** The chessboard is dynamically rendered using JavaScript, iterating over the board array and creating HTML elements for each square and piece.
   
4. **Drag-and-Drop Functionality:** Players can drag and drop pieces, with event listeners handling the interactions:
 - Dragging is allowed only if it’s the player’s turn.
 - Upon dropping, the move is sent to the server for validation.

5. **Socket Events:** Real-time communication ensures the game state is always in sync:
 - Players receive their role (white, black, or spectator).
 - Moves are validated by the server and broadcast to all connected clients.

### Backend Overview
1. **Server Setup:** Express serves the frontend and initializes Socket.io for WebSocket communication.
2. **Game Logic:** Chess.js manages the state of the game and validates moves.
3. **Player Management:** The server assigns roles (white, black, or spectator) and tracks connected players.
4. **Move Handling:** Upon receiving a move from the player, the server checks the validity and broadcasts the updated board state to all players and spectators.

## Future Improvements
- Add chat functionality for players and spectators.
- Implement move undo/redo options.
- Include AI opponents for single-player mode.
- Add player ratings and match history.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or bug fixes. Contributions are welcome!
