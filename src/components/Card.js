import React from "react";
import "./card.css";

function Card({ color, onClick, present, visible }) {
  return (
    <div
      className="card flippable"
      onClick={onClick}
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
