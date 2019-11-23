import React, { useState } from "react";

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

  const [counter, setCounter] = useState(0);

  function handleClickCard(idx) {
    if(!cardsState[idx].visible) {
      setCounter(prevCounter => prevCounter + 1);
    }

    flipCard(idx);
  }

  return (
    <>
      <div className="board">
        {
          cardsState.map(({ color, visible, present }, idx) => 
            <Card
              color={color}
              key={idx}
              onClick={() => handleClickCard(idx)}
              present={present}
              visible={visible}
            />
          )
        }
      </div>
      <div className="counter">
        <div className="counter--badge">
          { `Moves: ${counter} *` }
        </div>
        <span className="counter--note">{`*Perfect game: ${randomColors.length / 2}`}</span>
      </div>
    </>
  );
};

export default Board;
