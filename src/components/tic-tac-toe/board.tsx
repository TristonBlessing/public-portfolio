import { ReactElement } from "react";
import Square from "./square";
import { squareState } from "./square";

export type boardState = Array<squareState>;
export type boardProps = { xIsNext: boolean, squares: boardState, onGamePlay: (nextSquares: boardState) => void };

export const boardNumberofRows = 3;
export const boardNumberofColumns = 3;

export default function Board({ xIsNext, squares, onGamePlay }: boardProps): ReactElement {

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
        onGamePlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function renderSquare(squareIndex: number): ReactElement {
        return (
            <Square value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} key={squareIndex} />
        );
    }

    function boardRow(rowIndex: number): ReactElement {
        const returnElementArray: Array<ReactElement> = [];
        for (let i = rowIndex; i < rowIndex + 3; i += 1) {
            returnElementArray.push(renderSquare(i));
        }
        return (
            <div className="board-row">
                {returnElementArray}
            </div>
        );
    }
    const returnElementArray: Array<ReactElement> = [];
    for (let i = 0; i < squares.length; i += boardNumberofColumns) {
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