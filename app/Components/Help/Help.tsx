import React from "react";
import styles from "./Help.module.css";
import classNames from "classnames/bind";
import Card from "../Card/Card";

const cx = classNames.bind(styles);

function Help() {
  return (
    <div className={cx("container")}>
      <div className={cx("helpCase")}>
        <Card color="good" index={-1}>
          A
        </Card>
        <span>Bonne place</span>
      </div>
      <div className={cx("helpCase")}>
        <Card color="wrong" index={-1}>
          A
        </Card>
        <span>Mauvaise place</span>
      </div>
      <div className={cx("helpCase")}>
        <Card color="unknown" index={-1}>
          A
        </Card>
        <span>Non utilisée</span>
      </div>
    </div>
  );
}

export default Help;
