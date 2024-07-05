import Home from "../index";
import { renderWithReactQuery } from "../../../testUtils/render";
import { QueryClient } from "@tanstack/react-query";
import { fireEvent } from "@testing-library/react";
import * as hooks from "../../../hooks";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

client.setQueryData(
  ["tokens"],
  [
    { currency: "USD", price: 1 },
    { currency: "ETH", price: 1600 },
  ]
);

describe("Home", () => {
  it("renders correctly", () => {
    const screen = renderWithReactQuery(<Home />, client);
    expect(screen.getByText("Swap")).toBeVisible();
    expect(screen.getByText("USD")).toBeVisible();
    expect(screen.getByText("ETH")).toBeVisible();
    expect(screen.queryAllByPlaceholderText("Amount")).toHaveLength(2);
    expect(screen.getByTestId("exchange-btn")).toBeVisible();
  });

  it("exchange token correctly", () => {
    const screen = renderWithReactQuery(<Home />, client);
    const inputs = screen.queryAllByPlaceholderText("Amount");
    fireEvent.change(inputs[0], { target: { value: 1 } });
    expect(inputs[1]).toHaveValue("1,600");
    fireEvent.change(inputs[1], { target: { value: 3200 } });
    expect(inputs[0]).toHaveValue("2");
  });

  it("swap token correctly", () => {
    const mockMutate = vi.fn();
    vi.spyOn(hooks, "useSwap").mockReturnValue({
      isPending: false,
      mutate: mockMutate,
    } as never);
    const screen = renderWithReactQuery(<Home />, client);
    const inputs = screen.queryAllByPlaceholderText("Amount");
    fireEvent.change(inputs[0], { target: { value: 1 } });
    expect(inputs[1]).toHaveValue("1,600");
    const swapBtn = screen.getByText("Swap");
    fireEvent.click(swapBtn);
    expect(mockMutate).toBeCalledWith({ from: "ETH", to: "USD", amount: 1 });
  });
});
