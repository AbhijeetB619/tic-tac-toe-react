import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import Player from "./components/Player";

const INITIAL_GAME_STATE = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const SYMBOLS = {
  X: "X",
  O: "O",
};

const PLAYERS = {
  [SYMBOLS.X]: "Player 1",
  [SYMBOLS.O]: "Player 2",
};

const deriveGameBoard = (gameTurns) => {
  // clone the initial game state
  const gameBoard = [...INITIAL_GAME_STATE.map((row) => [...row])];
  for (let turn of gameTurns) {
    // update the game board with the current turn
    const { cell, player } = turn;
    const { row, col } = cell;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const deriveActivePlayer = (gameTurns) => {
  let player = SYMBOLS.X;
  if (gameTurns.length > 0) {
    const recentTurn = gameTurns[0];
    player = recentTurn.player === SYMBOLS.X ? SYMBOLS.O : SYMBOLS.X;
  }
  return player;
};

const checkWinner = (gameBoard, players) => {
  let winner = null;
  const winningCombinations = [
    // rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (let combination of winningCombinations) {
    const [cell1, cell2, cell3] = combination;
    const symbol1 = gameBoard[cell1[0]][cell1[1]];
    const symbol2 = gameBoard[cell2[0]][cell2[1]];
    const symbol3 = gameBoard[cell3[0]][cell3[1]];
    console.log(symbol1, symbol2, symbol3);
    console.log(players);
    if (symbol1 && symbol1 === symbol2 && symbol1 === symbol3) {
      winner = players[symbol1];
      break;
    }
  }
  return winner;
};

function App() {
  const [players, setPlayers] = useState({ ...PLAYERS });
  const [gameTurns, setGameTurns] = useState([]);

  const handleCellClick = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const player = deriveActivePlayer(prevGameTurns);
      const cell = { row: rowIndex, col: colIndex };
      return [{ cell, player }, ...prevGameTurns];
    });
  };

  const handleNameChange = ({ symbol, name }) => {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: name };
    });
  };

  const handleOnRestart = () => {
    setGameTurns([]);
  };

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  let winner = checkWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS[SYMBOLS.X]}
            symbol={SYMBOLS.X}
            isActive={activePlayer === SYMBOLS.X}
            onNameChange={handleNameChange}
          />
          <Player
            initialName={PLAYERS[SYMBOLS.O]}
            symbol={SYMBOLS.O}
            isActive={activePlayer === SYMBOLS.O}
            onNameChange={handleNameChange}
          />
        </ol>
        <GameBoard
          gameBoard={gameBoard}
          onSelection={handleCellClick}
        />
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleOnRestart} />
        )}
      </div>
      <Log turns={gameTurns} />
    </>
  );
}

export default App;
