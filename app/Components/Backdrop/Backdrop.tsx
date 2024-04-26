import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import styles from "./Backdrop.module.css";

type BackDropProps = ComponentPropsWithoutRef<"div">;

function Backdrop({ children }: BackDropProps) {
  return <section className={classNames(styles.container)}>{children}</section>;
}

export default Backdrop;
