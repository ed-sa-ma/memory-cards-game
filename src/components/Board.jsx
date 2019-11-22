import React from "react";

import useRandomColors from "../hooks/useRandomColors";
import useCardsState from "../hooks/useCardsState";
import Card from "./Card";
import "./board.css";

const POSSIBLE_COLORS = [
  "red", "blue", "yellow", "grey", "brown", "aqua", "green", "yellowgreen", "violet"
];

function Board({ numberOfCards = 20 }) {
  const randomColors = useRandomColors(POSSIBLE_COLORS, numberOfCards);
  const [cardsState, flipCard] = useCardsState(randomColors);

  return (
    <div className="board">
      {
        cardsState.map(({ color, visible, present }, idx) => 
          <Card
            color={color}
            key={idx}
            onClick={() => flipCard(idx)}
            present={present}
            visible={visible}
          />
        )
      }
    </div>
  );
};

export default Board;
