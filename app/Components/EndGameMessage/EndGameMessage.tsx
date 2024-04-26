import React from "react";
import Image from "next/image";
import useWindowSize from "@/app/Hooks/useWindowSize";
import Confetti from "react-confetti";
import { useWordleStore } from "@/app/Stores/useWordleStore";
import { GameState } from "@/app/Enum/Enum";
import Button from "../Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import Card from "../Card/Card";

function EndGameMessage() {
  const gameState = useWordleStore((state) => state.gameState);
  const replay = useWordleStore((state) => state.replay);
  const resetScore = useWordleStore((state) => state.resetScore);
  const selectWord = useWordleStore((state) => state.selectWord);

  const { width, height } = useWindowSize();

  const continueGame = () => {
    replay();
    selectWord();
  };

  const resetGame = () => {
    resetScore();
    continueGame();
  };

  if (gameState === GameState.WON) {
    return (
      <Backdrop>
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.1}
          confettiSource={{ x: (width || 0) / 2, y: height || 0, w: 0, h: 0 }}
          initialVelocityX={15}
          initialVelocityY={30}
        />
        <Card size="large">
          <h1>Félicitations</h1>
          <Image
            alt="Confettis"
            src="/confetti.gif"
            width={64}
            height={64}
            unoptimized
          />
          Vous avez gagné
          <Button onClick={continueGame} onKeyDown={continueGame}>
            Continuer
          </Button>
        </Card>
      </Backdrop>
    );
  }

  if (gameState === GameState.LOST) {
    return (
      <Backdrop>
        <Card size="large">
          <h1>Game Over</h1>
          <Image
            alt="triste"
            src="/crying.gif"
            width={64}
            height={64}
            unoptimized
          />
          Partie terminée
          <Button onClick={resetGame} onKeyDown={resetGame}>
            Rejouer
          </Button>
        </Card>
      </Backdrop>
    );
  }
}

export default EndGameMessage;
