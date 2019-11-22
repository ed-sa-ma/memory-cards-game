import React, { useCallback, useState, useEffect, useRef } from "react";

import useRandomColors from "../hooks/useRandomColors";
import Card from "./Card";
import "./board.css";

const COLOR_ARRAY = [
  "red", "blue", "yellow", "grey", "brown", "aqua", "green", "yellowgreen", "violet"
];

const checkTurnedCard = (listOfCards) => listOfCards.findIndex(i => i.visible);

function Board({ numberOfCards = 20 }) {
  const randomColors = useRandomColors(COLOR_ARRAY, numberOfCards);
  const [gameState, setGameState] = useState(randomColors.map(i => ({ visible: false, color: i , present: true })));
  const timer = useRef();

  useEffect(() => {
    const firstFoundIdx = checkTurnedCard(gameState);
    
    if(firstFoundIdx !== -1) {
      const secondFoundIdx = checkTurnedCard(gameState.slice(firstFoundIdx + 1, gameState.length));

      if(secondFoundIdx !== -1) {
        const firstFlippedCardIdx = firstFoundIdx;
        const secondFlippedCardIdx = firstFoundIdx + secondFoundIdx + 1;
        const firstCardFlipped = gameState[firstFlippedCardIdx];
        const secondCardFlipped = gameState[secondFlippedCardIdx];
        
        timer.current = setTimeout(() => {
          const newState = [...gameState];

          if (firstCardFlipped.color === secondCardFlipped.color) {
            // if the cards' colors match hide the cards completelly
            newState[firstFlippedCardIdx] = { ...firstCardFlipped, visible: false, present: false }
            newState[secondFlippedCardIdx] = { ...secondCardFlipped, visible: false, present: false }
          } else {
            // if the cards' colors don't match flip them back
            newState[firstFlippedCardIdx] = { ...firstCardFlipped, visible: false }
            newState[secondFlippedCardIdx] = { ...secondCardFlipped, visible: false }
          }

          setGameState(newState);
          timer.current = null;
        }, 1000);

        return () => {
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
        }
      }
    }
  }, [gameState]);

  const handleClick = useCallback((index) => {
    if (timer.current) {
      return;
    }

    const newState = [...gameState];
    
    newState[index] = { ...newState[index], visible: !newState[index].visible}
    setGameState(newState);
  }, [gameState]);

  return (
    <div className="board">
      {
        gameState.map(({ color, visible, present }, idx) => 
          <Card
            color={color}
            key={idx}
            onClick={() => handleClick(idx)}
            present={present}
            visible={visible}
          />
        )
      }
    </div>
  );
};

export default Board;
