import { render, screen } from "@testing-library/react";
import { useTheme, ThemeProvider } from "./theme-provider";
import { act } from "react";

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.setAttribute("data-theme", "light");
  });

  it('sets the default theme to "light"', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
  });
  it("loads theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
  it("toggles theme correctly", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: /toggle theme/i });
    act(() => button.click());

    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
  it("throws an error if useTheme is used outside ThemeProvider", () => {
    // save original console error
    const originalError = console.error;
    //Mock console.error to supress expected errors
    console.error = jest.fn;

    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    // Restore original console.error
    console.error = originalError;
  });
});

// Helper Component
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}
