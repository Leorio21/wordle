import classNames from "classnames/bind";
import styles from "./Board.module.css";
import { useWordleStore } from "@/app/Stores/useWordleStore";
import Line from "./Line/Line";
import Help from "../../Help/Help";
import Score from "../../Score/Score";

const cx = classNames.bind(styles);

function Board() {
  const history = useWordleStore((state) => state.history);

  return (
    <section className={cx("container")}>
      <Score />
      <div className={cx("pointColumn")}>
        <span className={cx("point")}>60 pts</span>
        <span className={cx("point")}>50 pts</span>
        <span className={cx("point")}>40 pts</span>
        <span className={cx("point")}>30 pts</span>
        <span className={cx("point")}>20 pts</span>
        <span className={cx("point")}>10 pts</span>
      </div>
      <div className={cx("linesContainer")}>
        {history.map((word, index) => (
          <Line key={index} word={word} index={index} />
        ))}
      </div>
      <Help />
    </section>
  );
}

export default Board;
