import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "../../components/Button";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Button", () => {
  const mockedProps: ButtonProps = {
    text: "Add to cart",
    handleOnClick: jest.fn(),
    disabled: false,
  };

  test("render the correct text", () => {
    render(<Button {...mockedProps} />);
    expect(screen.getByText(mockedProps.text)).toBeTruthy();
  });

  test("invoke the correct handler function", () => {
    render(<Button {...mockedProps} />);
    const btn = screen.getByText(mockedProps.text);
    fireEvent.click(btn);

    expect(mockedProps.handleOnClick).toBeCalled();
  });
});
