import classNames from "classnames";
import styles from "./Line.module.css";
import Card from "../../../Card/Card";
import { useWordleStore } from "@/app/Stores/useWordleStore";

type LineProps = {
  word: string;
  index: number;
};

function Line({ word, index }: LineProps) {
  const historyColor = useWordleStore((state) =>
    state.historyColor.filter((arr, id) => id === index)
  );
  return (
    <div className={classNames(styles.container)}>
      {word
        .padEnd(5, " ")
        .split("")
        .map((letter, ind) => (
          <Card
            key={`line-${index}${ind}`}
            index={ind}
            color={historyColor[0][ind]}
          >
            {letter}
          </Card>
        ))}
    </div>
  );
}

export default Line;
