import React from "react";

import { useSelector } from "../../store/GlobalStateProvider";
import Card from "./Card";
import ResetIcon from "../../svg/resetIcon.svg";

import styles from "./board.module.css";

function Board() {
  const { numberOfCards, count } = useSelector((state) => ({
    count: state.count,
    numberOfCards: state.board.length,
  }));

  let boardRender = [];
  for (let i = 0; i < numberOfCards; i++) {
    boardRender.push(<Card key={i} idx={i} />);
  }

  return (
    <>
      <div className={styles.board}>{boardRender}</div>
      <div className={styles.counter}>
        <div className={styles.counterBadge}>{`Moves: ${count} *`}</div>
        <div className={styles.counterBadge}>
          <img src={ResetIcon} alt="reset icon" />
        </div>
        <span className={styles.counterNote}>
          {`*Perfect game: ${numberOfCards}`}
        </span>
      </div>
    </>
  );
}

export default Board;
