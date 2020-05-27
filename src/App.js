import React from "react";

import { Router } from "./components";
import GlobalStateProvider from "./store/GlobalStateProvider";
import styles from "./App.module.css";

function App() {
  return (
    <GlobalStateProvider>
      <div className={styles.App}>
        <div className={styles.headlineContainer}>
          <h1 className={styles.headline}> MEMORY CARDS </h1>
        </div>
        <div className={styles.contentContainer}>
          <Router />
        </div>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
