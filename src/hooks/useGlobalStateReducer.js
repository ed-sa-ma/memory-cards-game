import { useReducer, useEffect } from "react";
import useRandomColors from "./useRandomColors";

const NUMBER_OF_CARDS = 16;
const POSSIBLE_COLORS = [
  "red",
  "blue",
  "yellow",
  "grey",
  "brown",
  "aqua",
  "green",
  "yellowgreen",
  "violet",
];

function reducer(state, action) {
  switch (action.type) {
    case "FLIP_CARD": {
      if (!state.isInteractive) return state;

      let wasVisible = state.board[action.idx].visible;
      let newBoard = [...state.board];
      let newCount = !wasVisible ? state.count + 1 : state.count;
      let newFlippedCards = [...state.flippedCards, action.idx];

      newBoard[action.idx] = {
        ...newBoard[action.idx],
        visible: !wasVisible,
      };

      return {
        ...state,
        board: newBoard,
        count: newCount,
        flippedCards: newFlippedCards,
      };
    }
    case "DISABLE_BOARD": {
      return { ...state, isInteractive: false };
    }
    case "SUCCESS_PAIR": {
      let newBoard = [...state.board];

      newBoard[state.flippedCards[0]] = {
        ...newBoard[state.flippedCards[0]],
        present: false,
      };

      newBoard[state.flippedCards[1]] = {
        ...newBoard[state.flippedCards[1]],
        present: false,
      };

      return {
        ...state,
        board: newBoard,
        flippedCards: [],
        isInteractive: true,
      };
    }
    case "FAIL_PAIR": {
      let newBoard = [...state.board];

      newBoard[state.flippedCards[0]] = {
        ...newBoard[state.flippedCards[0]],
        visible: false,
      };

      newBoard[state.flippedCards[1]] = {
        ...newBoard[state.flippedCards[1]],
        visible: false,
      };

      return {
        ...state,
        board: newBoard,
        flippedCards: [],
        isInteractive: true,
      };
    }
    default: {
      return state;
    }
  }
}

export default function useGlobalStateReducer() {
  const randomColors = useRandomColors(POSSIBLE_COLORS, NUMBER_OF_CARDS);
  let initialBoard = randomColors.map((color) => ({
    visible: false,
    color,
    present: true,
  }));

  const [state, dispatch] = useReducer(reducer, {
    board: initialBoard,
    isInteractive: true,
    count: 0,
    flippedCards: [],
  });

  useEffect(() => {
    if (
      state.flippedCards.length < 2 ||
      state.flippedCards[0] === state.flippedCards[1]
    ) {
      return () => {};
    }

    // Keep the user from flipping more cards while the check happens.
    dispatch({ type: "DISABLE_BOARD" });

    let matchColors =
      state.board[state.flippedCards[0]].color ===
      state.board[state.flippedCards[1]].color;

    let timeout = setTimeout(() => {
      dispatch({ type: matchColors ? "SUCCESS_PAIR" : "FAIL_PAIR" });
    }, 800);

    return () => clearTimeout(timeout);
  }, [state.board, state.flippedCards]);

  return [state, dispatch];
}
