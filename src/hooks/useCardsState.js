import { useCallback, useEffect, useRef, useState } from "react";

const checkTurnedCard = (listOfCards) => listOfCards.findIndex(i => i.visible);

function useCardsState(colorDisposition) {
  // This timmer will apply a delay to be able to see the backside after flipping cards.
  const timerRef = useRef();
  const [cardsState, setCardsState] = useState(colorDisposition.map(i => ({ visible: false, color: i , present: true })));
  
  useEffect(() => {
    const firstFoundIdx = checkTurnedCard(cardsState);
    
    if(firstFoundIdx !== -1) {
      const secondFoundIdx = checkTurnedCard(cardsState.slice(firstFoundIdx + 1, cardsState.length));

      if(secondFoundIdx !== -1) {
        const firstFlippedCardIdx = firstFoundIdx;
        const secondFlippedCardIdx = firstFoundIdx + secondFoundIdx + 1;
        const firstCardFlipped = cardsState[firstFlippedCardIdx];
        const secondCardFlipped = cardsState[secondFlippedCardIdx];
        
        timerRef.current = setTimeout(() => {
          const newState = [...cardsState];

          if (firstCardFlipped.color === secondCardFlipped.color) {
            // if the cards' colors match hide the cards completelly
            newState[firstFlippedCardIdx] = { ...firstCardFlipped, visible: false, present: false }
            newState[secondFlippedCardIdx] = { ...secondCardFlipped, visible: false, present: false }
          } else {
            // if the cards' colors don't match flip them back
            newState[firstFlippedCardIdx] = { ...firstCardFlipped, visible: false }
            newState[secondFlippedCardIdx] = { ...secondCardFlipped, visible: false }
          }

          setCardsState(newState);
          timerRef.current = null;
        }, 1000);

        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }
      }
    }
  }, [cardsState, timerRef]);

  const flipCard = useCallback((index) => {
    if (timerRef.current) {
      return;
    }

    const newState = [...cardsState];    
    newState[index] = { ...newState[index], visible: !newState[index].visible}
    setCardsState(newState);
  }, [cardsState]);

  return [cardsState, flipCard];
};

export default useCardsState;
