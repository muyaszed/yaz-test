import React from "react";

export interface ButtonProps {
  text: string;
  handleOnClick(): void;
  disabled: boolean;
}

const Button = ({ text, handleOnClick, disabled }: ButtonProps) => {
  return (
    <button
      className={
        disabled
          ? "product-add-to-cart-btn-disabled"
          : "product-add-to-cart-btn"
      }
      onClick={handleOnClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
