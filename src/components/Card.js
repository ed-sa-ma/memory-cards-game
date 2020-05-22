import React from "react";

import { useSelector, useDispatch } from "./GlobalStateProvider";

import "./card.css";

function Card({ idx }) {
  const { color, present, visible } = useSelector((state) => state.board[idx]);
  const dispatch = useDispatch();

  function handleClickCard() {
    dispatch({ type: "FLIP_CARD", idx });
  }

  return (
    <div
      className="card flippable"
      onClick={handleClickCard}
      style={{
        opacity: `${present ? "1" : "0"}`,
      }}
    >
      <div className={`flipper ${visible ? "flipped" : ""}`.trim()}>
        <div className="back" style={{ backgroundColor: `${color}` }} />
        <div className="front" style={{ backgroundColor: `#333` }} />
      </div>
    </div>
  );
}

export default Card;
