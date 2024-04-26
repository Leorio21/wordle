import classNames from "classnames/bind";
import styles from "./Card.module.css";
import { ComponentPropsWithoutRef } from "react";
import { LetterColor } from "../../Types/Types";

const cx = classNames.bind(styles);

type CardProps = {
  color?: LetterColor;
  index?: number;
  cursor?: boolean;
  size?: "small" | "large";
} & ComponentPropsWithoutRef<"div">;

function Card({
  color = "notPlayed",
  index = NaN,
  cursor = false,
  size = "small",
  children,
  ...props
}: CardProps) {
  const delay = Number.isNaN(index) ? 1.5 : (index + 1) * 0.3;
  return (
    <div
      className={cx("container", size, color, { cursor: cursor })}
      style={{
        transition:
          color === "notPlayed" ? "unset" : `all .2s ease-in-out ${delay}s`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
