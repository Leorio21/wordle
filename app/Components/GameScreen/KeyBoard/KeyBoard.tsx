import classNames from "classnames";
import styles from "./KeyBoard.module.css";
import Card from "../../Card/Card";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrReturn } from "react-icons/gr";
import { useWordleStore } from "../../../Stores/useWordleStore";
import { useId } from "react";

function KeyBoard() {
  const lettersColor = useWordleStore((state) => state.lettersColor);
  const addLetterToWord = useWordleStore((state) => state.addLetterToWord);
  const verifWord = useWordleStore((state) => state.verifWord);
  const deleteLastLetter = useWordleStore((state) => state.deleteLastLetter);
  const keyboardLetter: React.JSX.Element[] = [];
  for (const letter in lettersColor) {
    keyboardLetter.push(
      <Card
        // eslint-disable-next-line react-hooks/rules-of-hooks
        key={useId()}
        color={lettersColor[letter]}
        cursor={true}
        onClick={() => addLetterToWord(letter)}
      >
        {letter}
      </Card>
    );
  }

  return (
    <div className={classNames(styles.container)}>
      {keyboardLetter}
      <Card cursor={true} onClick={deleteLastLetter}>
        <GrFormPreviousLink />
      </Card>
      <Card cursor={true} onClick={verifWord}>
        <GrReturn />
      </Card>
    </div>
  );
}

export default KeyBoard;
