import React from "react";

export interface QuantitySelectorProps {
  qtyValue: number;
  handleQtyIncrease(): void;
  handleQtyDecrease(): void;
  hideSelector: boolean;
}

const QuantitySelector = ({
  qtyValue,
  handleQtyDecrease,
  handleQtyIncrease,
  hideSelector,
}: QuantitySelectorProps) => {
  return (
    <div
      className={
        hideSelector
          ? "product-selector-wrapper-zero"
          : "product-selector-wrapper"
      }
    >
      {!hideSelector && (
        <div className="product-qty-decrease" onClick={handleQtyDecrease}>
          -
        </div>
      )}
      <div className="product-qty" aria-label="Quantity">
        {qtyValue}
      </div>
      {!hideSelector && (
        <div className="product-qty-increase" onClick={handleQtyIncrease}>
          +
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
