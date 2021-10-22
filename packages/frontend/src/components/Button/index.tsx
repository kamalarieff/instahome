import React from "react";

import classes from "./Button.module.css";

type VariantsKey = "add" | "remove";

const variantsMap: { [key in VariantsKey]: string } = {
  add: classes.add,
  remove: classes.remove,
};

/**
 * @description Button components
 *
 * @param onClick Callback function when button is clicked
 * @param variant Button variant
 * @param children Children element
 */
function Button({
  onClick,
  variant,
  children,
}: {
  onClick: () => void;
  variant: VariantsKey;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={variantsMap[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
