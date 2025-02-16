import { ReactElement } from "react";

export type squareProps = {value: squareState, onSquareClick: React.MouseEventHandler<HTMLButtonElement> | undefined};
export type squareState = string | null;

export default function Square({ value, onSquareClick }: squareProps): ReactElement {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}