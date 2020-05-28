import { useMemo } from "react";

import { shuffleArray } from "../helpers";

// Color palette generated here:
// https://coolors.co/063f50-724e56-db504a-df8328-e3b505-9b9f4b-56a3a6-e6e1c5-ada375
const POSSIBLE_COLORS = [
  "#063F50",
  "#724E56",
  "#DB504A",
  "#DF8328",
  "#E3B505",
  "#9B9F4B",
  "#56A3A6",
  "#E6E1C5",
  "#ADA375",
];

function useRandomColors(numberOfCards) {
  const shuffledColors = useMemo(() => {
    let result = [...POSSIBLE_COLORS, ...POSSIBLE_COLORS];

    return shuffleArray(result);
  }, []);

  return shuffledColors;
}

export default useRandomColors;
