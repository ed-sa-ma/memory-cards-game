import React, { useEffect } from "react";

import { useRandomColors } from "../../hooks";
import { useSelector, useDispatch } from "../../store/GlobalStateProvider";
import { Button } from "../";
import Card from "./Card";
import { goToMain } from "../Router/Router";

import styles from "./board.module.css";
import resetIcon from "../../svg/resetIcon.svg";
import returnIcon from "../../svg/returnIcon.svg";

function Board() {
  const { numberOfCards, count } = useSelector((state) => ({
    count: state.count,
    numberOfCards: state.board.length,
  }));
  const dispatch = useDispatch();

  let randomColors = useRandomColors();

  useEffect(() => {
    dispatch({ type: "SET_BOARD", colors: randomColors });

    let timeout = setTimeout(() => {
      dispatch({ type: "HIDE_ALL_CARDS" });
    }, 3000);

    return () => {
      dispatch({ type: "RESET_BOARD" });
      clearTimeout(timeout);
    };
  }, [dispatch, randomColors]);

  let boardRender = [];
  for (let i = 0; i < numberOfCards; i++) {
    boardRender.push(<Card key={i} idx={i} />);
  }

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>{boardRender}</div>
      <div className={styles.counter}>
        <div className={styles.counterBadge}>{`Moves: ${count} *`}</div>
        <span className={styles.counterNote}>
          {`*Perfect game: ${numberOfCards}`}
        </span>
        <Button leftIcon={resetIcon} onClick={() => {}} />
        <Button leftIcon={returnIcon} onClick={goToMain} />
      </div>
    </div>
  );
}

export default Board;
