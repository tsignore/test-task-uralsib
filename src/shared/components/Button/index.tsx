import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, to }) => {
  if (to) {
    return (
      <Link to={to} className={styles.button}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
