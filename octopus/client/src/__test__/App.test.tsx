import React from "react";
import { render, screen, fireEvent, act, wait } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import App from "../App";
import GET_PRODUCT_BY_ID from "../graphql/queries/product";

const mocks = [
  {
    request: {
      query: GET_PRODUCT_BY_ID,
      variables: {
        productId: 1,
      },
    },
    result: {
      data: {
        product: {
          id: "1",
          name: "Energy saving light bulb",
          power: "25W",
          description:
            "Available in 7 watts, 9 watts, 11 watts Spiral Light bulb in B22, bulb switches on instantly, no wait around warm start and flicker free features make for a great all purpose bulb",
          price: 1299,
          quantity: 4,
          brand: "Philips",
          weight: 77,
          height: 12.6,
          width: 6.2,
          length: 6.2,
          modelCode: "E27 ES",
          colour: "Cool daylight",
          imgUrl: "https://i.ibb.co/2nzwxnQ/bulb.png",
        },
      },
    },
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test("should be able to increase and decrease product quantity", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await wait();
  });

  const minusSign = await screen.findByText("-");
  const plusSign = await screen.findByText("+");
  const qtyValue = await screen.findByLabelText("Quantity");

  expect(qtyValue.textContent).toBe("1");

  fireEvent.click(plusSign);
  expect(qtyValue.textContent).toBe("2");

  fireEvent.click(minusSign);
  expect(qtyValue.textContent).toBe("1");
});

test("should not allow user to increase more that total quantity available", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await wait();
  });

  const plusSign = await screen.findByText("+");
  const qtyValue = await screen.findByLabelText("Quantity");
  fireEvent.click(plusSign);
  fireEvent.click(plusSign);
  fireEvent.click(plusSign);
  fireEvent.click(plusSign);
  expect(qtyValue.textContent).toBe("4");
});

test("should not allow user to decrease more that the minimum value of 1", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await wait();
  });

  const minusSign = await screen.findByText("-");
  const qtyValue = await screen.findByLabelText("Quantity");
  fireEvent.click(minusSign);
  fireEvent.click(minusSign);
  fireEvent.click(minusSign);
  fireEvent.click(minusSign);
  expect(qtyValue.textContent).toBe("1");
});

test("should be able to add items to the basket", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await wait();
  });

  const addBtn = await screen.findByText("Add to cart");
  fireEvent.click(addBtn);

  await wait(() => screen.getByLabelText("Basket"));

  expect(screen.getByLabelText("Basket").textContent).toBe("1");
});

test("should disable add to cart button and set quantity to 0 when all item is added to cart", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await wait();
  });

  const plusSign = await screen.findByText("+");
  const addBtn = await screen.findByText("Add to cart");
  const qtyValue = await screen.findByLabelText("Quantity");

  fireEvent.click(plusSign);
  fireEvent.click(plusSign);
  fireEvent.click(plusSign);
  fireEvent.click(plusSign);
  fireEvent.click(addBtn);

  await wait(() => screen.getByLabelText("Basket"));

  expect(screen.getByLabelText("Basket").textContent).toBe("4");
  expect(qtyValue.textContent).toBe("0");
  expect(addBtn.closest("button")).toBeDisabled();
});
