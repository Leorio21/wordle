import React from "react";
import classNames from "classnames";
import styles from "./Chart.module.css";

type ChartProps = {
  value: number;
  index: number;
  height: number;
};

function Chart({ value, index, height }: ChartProps) {
  return (
    <div className={classNames(styles.chartContainer)}>
      <span className={classNames(styles.nbWords)}>{value}</span>
      <p
        className={classNames(styles.chart)}
        style={{
          height: `${height}px`,
        }}
      ></p>
      <span>{index + 1}</span>
    </div>
  );
}

export default Chart;
