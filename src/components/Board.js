import React from "react";

import { useSelector } from "./GlobalStateProvider";
import Card from "./Card";

import styles from "./board.module.css";

function Board() {
  const { board, count } = useSelector((state) => ({
    count: state.count,
    board: state.board,
  }));

  return (
    <>
      <div className={styles.board}>
        {board.map((_, idx) => (
          <Card key={idx} idx={idx} />
        ))}
      </div>
      <div className={styles.counter}>
        <div className={styles.counterBadge}>{`Moves: ${count} *`}</div>
        <span className={styles.counterNote}>
          {`*Perfect game: ${board.length}`}
        </span>
      </div>
    </>
  );
}

export default Board;
