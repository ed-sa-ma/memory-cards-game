import React from "react";

import { useSelector } from "./GlobalStateProvider";
import Card from "./Card";

import "./board.css";

function Board() {
  const { board, count } = useSelector((state) => ({
    count: state.count,
    board: state.board,
  }));

  return (
    <>
      <div className="board">
        {board.map((_, idx) => (
          <Card key={idx} idx={idx} />
        ))}
      </div>
      <div className="counter">
        <div className="counter--badge">{`Moves: ${count} *`}</div>
        <span className="counter--note">
          {`*Perfect game: ${board.length}`}
        </span>
      </div>
    </>
  );
}

export default Board;
