import { useState } from "react";
import "./tictactoe.css";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const determineWinner = (board) => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [x, y, z] = WINNING_COMBINATIONS[i];

    if (board[x] !== null && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }

  return null;
};

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXplaying, setIsXPlaying] = useState(true);

  const winner = determineWinner(board);

  const getMessage = () => {
    if (winner) {
      return `Winner is: ${winner}`;
    }

    if (!board.includes(null)) {
      return `We have a draw`;
    }

    return `Your turn ${isXplaying ? "X" : "O"}`;
  };

  const onReset = () => {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  };

  return (
    <>
      <div className="container">
        <div className="message">{getMessage()}</div>
        <div className="board">
          {board.map((_ele, i) => {
            return (
              <button
                className="cell"
                disabled={!winner == null || board[i] !== null}
                onClick={() => {
                  const newBoard = board.slice();
                  newBoard[i] = isXplaying ? "X" : "O";
                  setBoard(newBoard);
                  setIsXPlaying(!isXplaying);
                }}
              >
                {board[i]}
              </button>
            );
          })}
        </div>
        <button className="buttonClass" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </>
  );
};
