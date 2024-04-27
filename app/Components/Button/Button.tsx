import React, { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

type ButtonProps = ComponentPropsWithoutRef<"div">;

function Button({ children, ...props }: ButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [buttonRef]);

  return (
    <div
      ref={buttonRef}
      tabIndex={-1}
      className={classNames(styles.container)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Button;
