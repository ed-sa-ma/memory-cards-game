import { useMemo } from "react";

function useRandomColors(availableColors, numberOfCards) {
  const randomColors = useMemo(function generateListOfColors() {
    // There needs to be always an even number of cards.
    const evenNumberOfCards = numberOfCards % 2 === 0 ? numberOfCards : numberOfCards - 1;
    const listOfColors = [];

    // Generating an array with colors duplicated that will be shuffled after.
    for (let i = 0; i < evenNumberOfCards; i++) {
      listOfColors.push(availableColors[Math.floor(i / 2) % availableColors.length]);
    }
    
    function shuffleArray(arr) {
      var processedArray = [...arr];
      var result = [];
  
      for (let i = 0; i < arr.length; i ++) {
        const randomIndex = Math.floor(Math.random() * processedArray.length);
        result.push(processedArray[randomIndex]);
        processedArray.splice(randomIndex, 1)
      }
  
      return result;
    };
    
    return shuffleArray(listOfColors);
  }, [availableColors, numberOfCards]);

  return randomColors;
};

export default useRandomColors;
