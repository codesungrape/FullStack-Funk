import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

// Mock the components and modules
jest.mock("next/font/google", () => ({
  Inter: jest.fn().mockReturnValue({
    className: "mock-inter-font",
  }),
}));

jest.mock("@/components/header/header", () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock("@/app/providers/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-theme-provider">{children}</div>
  ),
}));

// Create a test-friendly version of the layout component
const TestLayout = ({ children }: { children: React.ReactNode }) => {
  const layout = RootLayout({ children });
  return <div>{layout.props.children}</div>;
};

describe("RootLayout", () => {
  const mockChildren = <div data-testid="mock-children">Test Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders components and applies styling", () => {
    render(<TestLayout>{mockChildren}</TestLayout>);

    // Test Theme Provider rendering
    const themeProvider = screen.getByTestId("mock-theme-provider");
    expect(themeProvider).toBeInTheDocument();

    // Test Header rendering
    const header = screen.getByTestId("mock-header");
    expect(header).toBeInTheDocument();

    // Test children rendering
    const children = screen.getByTestId("mock-children");
    expect(children).toBeInTheDocument();

    // Test font class application
    const body = screen.getByTestId("mock-theme-provider").parentElement;
    expect(body).toHaveClass("mock-inter-font");
  });

  it("renders components in correct order", () => {
    render(<TestLayout>{mockChildren}</TestLayout>);

    const header = screen.getByTestId("mock-header");
    const children = screen.getByTestId("mock-children");

    // Header should come before children
    expect(header.compareDocumentPosition(children)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  // Test the original component's structure
  it("has correct root structure", () => {
    const layout = RootLayout({ children: mockChildren });

    expect(layout.type).toBe("html");
    expect(layout.props.lang).toBe("en");
    expect(layout.props.suppressHydrationWarning).toBe(true);
  });
});
