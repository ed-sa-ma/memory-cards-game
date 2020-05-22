import React from "react";

import Board from "./components/Board";
import GlobalStateProvider from "./components/GlobalStateProvider";
import "./App.css";

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <div className="headlineContainer">
          <h1 className="headline"> MEMORY CARDS </h1>
        </div>
        <Board />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
