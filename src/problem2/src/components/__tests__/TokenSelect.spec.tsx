import TokenSelect from "../TokenSelect";
import * as hooks from "../../hooks";
import { renderWithTheme } from "../../testUtils/render";
import { fireEvent, waitFor } from "@testing-library/react";

describe("TokenSelect", () => {
  it("renders correctly", () => {
    const spy = vi.spyOn(hooks, "useTokens");
    spy.mockReturnValue({ data: [{ currency: "USD", price: 1 }] } as never);
    const screen = renderWithTheme(<TokenSelect />);
    expect(screen.getByText("Select Token")).toBeVisible();
    screen.rerender(<TokenSelect value="USD" />);
    expect(screen.getByText("USD")).toBeVisible();
  });

  it("onChange handle works correctly", async () => {
    const spy = vi.spyOn(hooks, "useTokens");
    const onChange = vi.fn();
    spy.mockReturnValue({
      data: [
        { currency: "USD", price: 1 },
        { currency: "BUSD", price: 0.999 },
      ],
      isLoading: false,
    } as never);
    const screen = renderWithTheme(<TokenSelect onChange={onChange} />);
    const button = screen.getByText("Select Token");
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByPlaceholderText("Search")).toBeVisible()
    );
    expect(screen.getByText("USD")).toBeVisible();
    expect(screen.getByText("BUSD")).toBeVisible();
    fireEvent.click(screen.getByText("BUSD"));
    expect(onChange).toBeCalledWith("BUSD");
  });
});
