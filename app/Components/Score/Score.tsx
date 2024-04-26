import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Score.module.css";
import { useWordleStore } from "@/app/Stores/useWordleStore";
import Chart from "./Chart/Chart";

function Score() {
  const wordFind = useWordleStore((state) => state.wordFind);
  const score = useWordleStore((state) => state.score);
  const [bestChart, setBestChart] = useState(10);

  useEffect(() => {
    setBestChart(() => {
      const max = wordFind.reduce(
        (acc, value) => (value > acc ? value : acc),
        0
      );
      return max;
    });
  }, [wordFind]);
  return (
    <div className={classNames(styles.container)}>
      <p className={classNames(styles.score)}>
        <span>Score</span>
        <span className={classNames(styles.point)}>{score}</span>
      </p>
      <div className={classNames(styles.stats)}>
        {wordFind.map((value, index) => {
          const height = value === 0 ? 1 : (value * 200) / bestChart;
          return (
            <Chart
              key={`try${index}-${value}`}
              value={value}
              index={index}
              height={height}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Score;
