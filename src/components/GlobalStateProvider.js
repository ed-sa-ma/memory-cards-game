import React, { createContext, useContext, useMemo } from "react";

import useGlobalStateReducer from "../hooks/useGlobalStateReducer";

const GlobalContext = createContext();

// Hook to acces properties from the global state accessible via callback optionally.
export function useSelector(accessCb) {
  const [state] = useContext(GlobalContext);

  const returnedState = useMemo(() => {
    if (!accessCb) return state;

    return accessCb(state);
  }, [accessCb, state]);

  return returnedState;
}

// Hook to dispatch actions to alter the global state.
export function useDispatch() {
  const [, dispatch] = useContext(GlobalContext);

  return dispatch;
}

export default function GlobalStateProvider({ children }) {
  const [state, dispatch] = useGlobalStateReducer();

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
}
