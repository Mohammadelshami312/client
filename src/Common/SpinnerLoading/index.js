import React from "react";
import styles from "./style.module.css";
export default function SpinnerLoading() {
  return (
    <div>
      <div class={`spinner-grow ${styles.spin}`}></div>
      <div class={`spinner-grow ${styles.spin}`}></div>
      <div class={`spinner-grow ${styles.spin}`}></div>
    </div>
  );
}
