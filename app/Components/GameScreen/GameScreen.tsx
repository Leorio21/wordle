import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./GameScreen.module.css";
import Board from "./Board/Board";
import KeyBoard from "./KeyBoard/KeyBoard";
import { useWordleStore } from "@/app/Stores/useWordleStore";
import { GameState } from "@/app/Enum/Enum";
import EndGameMessage from "../EndGameMessage/EndGameMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function GameScreen() {
  const gameScreenRef = useRef<HTMLDivElement>(null);
  const displayEndGameMessage = useWordleStore(
    (state) => state.displayEndGameMessage
  );
  const gameState = useWordleStore((state) => state.gameState);
  const letters = useWordleStore((state) => state.letters);
  const errorMessage = useWordleStore((state) => state.errorMessage);
  const addLetterToWord = useWordleStore((state) => state.addLetterToWord);
  const changeEndGameMessageState = useWordleStore(
    (state) => state.changeEndGameMessageState
  );
  const verifWord = useWordleStore((state) => state.verifWord);
  const deleteLastLetter = useWordleStore((state) => state.deleteLastLetter);

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (gameState === GameState.PENDING) {
      const keyPress = event.key.toUpperCase();
      if (letters.includes(keyPress)) {
        addLetterToWord(keyPress);
      }
      if (keyPress === "ENTER") {
        verifWord();
      }
      if (keyPress === "BACKSPACE") {
        deleteLastLetter();
      }
    }
  };

  useEffect(() => {
    gameScreenRef.current?.focus();
    if (gameState !== GameState.PENDING) {
      setTimeout(() => changeEndGameMessageState(true), 1800);
    }
  }, [gameState, errorMessage]);

  return (
    <>
      <div
        ref={gameScreenRef}
        className={classNames(styles.container)}
        onKeyDown={onKeyDownHandler}
        tabIndex={-1}
      >
        <Board />
        <KeyBoard />
      </div>
      {displayEndGameMessage && <EndGameMessage />}
      {errorMessage.display && <ErrorMessage />}
    </>
  );
}

export default GameScreen;
