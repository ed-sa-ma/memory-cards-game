import React from "react";

import styles from "./button.module.css";

export default function Button({ label, leftIcon, rightIcon }) {
  return (
    <button className={styles.button}>
      {leftIcon && (
        <img src={leftIcon} alt="left-icon" width={24} height={24} />
      )}
      {label && <span>{label}</span>}
      {rightIcon && (
        <img src={rightIcon} alt="right-icon" width={24} height={24} />
      )}
    </button>
  );
}
