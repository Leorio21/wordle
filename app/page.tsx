"use client";

import { useEffect } from "react";
import GameScreen from "./Components/GameScreen/GameScreen";
import { useWordleStore } from "./Stores/useWordleStore";
import styles from "./page.module.css";
import classNames from "classnames";

export default function Home() {
  const selectWord = useWordleStore((state) => state.selectWord);

  useEffect(() => {
    selectWord();
  }, []);
  return (
    <main className={classNames(styles.container)}>
      <GameScreen />
    </main>
  );
}
