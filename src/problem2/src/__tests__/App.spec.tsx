import App from "../App";
import { renderWithTheme } from "../testUtils/render";

describe("App", () => {
  it("renders without crashing", () => {
    const screen = renderWithTheme(<App />);
    expect(screen.container).toBeInTheDocument();
  });
});
