import React from "react";

import { Button } from "../";

import { goToGame, goToScores } from "../Router/Router";
import styles from "./menu.module.css";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <Button label="Start game" onClick={goToGame} />
      <Button label="View scores" onClick={goToScores} />
    </div>
  );
}
