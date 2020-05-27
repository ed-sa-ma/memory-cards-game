import React from "react";

import { Button } from "../";

import styles from "./menu.module.css";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <Button label="Start game" />
      <Button label="View scores" />
    </div>
  );
}
