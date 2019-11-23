import React from "react";

import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="headlineContainer">
        <h1 className="headline"> MEMORY CARDS </h1>
      </div>
      <Board />
    </div>
  );
}

export default App;
