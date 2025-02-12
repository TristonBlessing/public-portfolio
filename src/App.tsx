import { ReactEventHandler, useState } from "react";
import { ReactElement } from "react";

type squareState = string | null;
type boardState = Array<squareState>;
type squareProps = {value: squareState, onSquareClick: React.MouseEventHandler<HTMLButtonElement> | undefined};
type boardProps = {xIsNext: boolean, squares: boardState, onPlay: any};

const boardNumberofRows = 3;
const boardNumberofColumns = 3;
const boardCells = boardNumberofRows * boardNumberofColumns;

function Square({ value, onSquareClick }: squareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: boardProps): ReactElement {
  function handleClick(squareIndex: number) {
    if (squares[squareIndex] || calculateWinner(squares)) {
      return;
    }
    const nextSquares: boardState = squares.slice();
    nextSquares[squareIndex] = "X";
    if (xIsNext) {
      nextSquares[squareIndex] = "X";
    } else {
      nextSquares[squareIndex] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function boardRow(rowIndex: number): ReactElement{
    return (
      <div className="board-row">
        <Square value={squares[rowIndex]}  onSquareClick={() => handleClick(rowIndex)} key={rowIndex} />
        <Square value={squares[rowIndex+1]}  onSquareClick={() => handleClick(rowIndex+1)} key={rowIndex+1}  />
        <Square value={squares[rowIndex+2]}  onSquareClick={() => handleClick(rowIndex+2)} key={rowIndex+2}  />
      </div>
    );
  }

  const returnElementArray: Array<ReactElement> = [];
  for(let i = 0; i < squares.length; i += boardNumberofColumns){
    returnElementArray.push(boardRow(i));
  }

  return (
    <>
      <div className="status">{status}</div>
      {returnElementArray}
    </>
  );
}

function calculateWinner(squares: boardState) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState<Array<boardState>>([Array(boardCells).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: boardState) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}