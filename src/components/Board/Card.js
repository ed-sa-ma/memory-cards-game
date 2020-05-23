import React from "react";

import { useSelector, useDispatch } from "../../store/GlobalStateProvider";

import styles from "./card.module.css";

function Card({ idx }) {
  const { color, present, visible } = useSelector((state) => state.board[idx]);
  const dispatch = useDispatch();

  function handleClickCard() {
    dispatch({ type: "FLIP_CARD", idx });
  }

  return (
    <div
      className={`${styles.card} ${styles.flippable}`}
      onClick={handleClickCard}
      style={{
        opacity: `${present ? "1" : "0"}`,
      }}
    >
      <div
        className={`${styles.flipper} ${visible ? styles.flipped : ""}`.trim()}
      >
        <div className={styles.back} style={{ backgroundColor: `${color}` }} />
        <div className={styles.front} style={{ backgroundColor: `#333` }} />
      </div>
    </div>
  );
}

export default Card;
