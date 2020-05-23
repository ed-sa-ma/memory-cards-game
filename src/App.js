import React from "react";

import { Board } from "./components";
import GlobalStateProvider from "./store/GlobalStateProvider";
import styles from "./App.module.css";

function App() {
  return (
    <GlobalStateProvider>
      <div className={styles.App}>
        <div className={styles.headlineContainer}>
          <h1> MEMORY CARDS </h1>
        </div>
        <Board />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
