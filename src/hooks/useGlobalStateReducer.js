import { useReducer, useEffect } from "react";

const INITIAL_STATE = {
  board: [],
  isInteractive: false,
  count: 0,
  flippedCards: [],
};

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
    case "HIDE_ALL_CARDS": {
      let newBoard = state.board.map((card) => ({ ...card, visible: false }));

      return { ...state, board: newBoard, isInteractive: true };
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
    case "RESET_BOARD": {
      return { ...state, INITIAL_STATE };
    }
    case "SET_BOARD": {
      let { colors } = action;
      let board = colors.map((color) => ({
        color,
        visible: true,
        present: true,
      }));

      return { ...state, INITIAL_STATE, board };
    }
    default: {
      return state;
    }
  }
}

export default function useGlobalStateReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Initiate a check if two cards are flipped.
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
