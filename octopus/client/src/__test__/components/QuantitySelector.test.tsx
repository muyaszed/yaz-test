import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantitySelector, {
  QuantitySelectorProps,
} from "../../components/QuantitySelector";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("QuantitySelector", () => {
  const mockedProps: QuantitySelectorProps = {
    qtyValue: 1,
    handleQtyIncrease: jest.fn(),
    handleQtyDecrease: jest.fn(),
    hideSelector: false,
  };

  test("render the correct qty value", () => {
    render(<QuantitySelector {...mockedProps} />);
    expect(screen.getByLabelText("Quantity")).toHaveTextContent("1");
  });

  test("invoke the correct handler function", () => {
    render(<QuantitySelector {...mockedProps} />);
    const increaseSelector = screen.getByText("+");
    const decreaseSelector = screen.getByText("-");

    fireEvent.click(increaseSelector);
    expect(mockedProps.handleQtyIncrease).toBeCalled();

    fireEvent.click(decreaseSelector);
    expect(mockedProps.handleQtyDecrease).toBeCalled();
  });
});
