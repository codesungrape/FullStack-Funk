import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import Sidebar from "./sidebar";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

// Mock TextEncoder/TextDecoder if not available in the test environment
if (typeof global.TextEncoder === 'undefined' || typeof global.TextDecoder === 'undefined') {
    class MockTextEncoder {
      encode(text: string): Uint8Array {
        return new Uint8Array(Buffer.from(text));
      }
    }
    
    class MockTextDecoder {
      decode(buffer?: Uint8Array): string {
        if (!buffer) return '';
        return Buffer.from(buffer).toString();
      }
    }
    
    // @ts-ignore - Ignoring type mismatch for testing purposes
    global.TextEncoder = MockTextEncoder;
    // @ts-ignore - Ignoring type mismatch for testing purposes 
    global.TextDecoder = MockTextDecoder;
  }

// Mock the fetch function
const mockFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;
global.fetch = mockFetch;

// Helper to mock fetch responses
const mockFetchResponse = (
  status: number,
  data: any,
  contentType: string = "application/json",
): Promise<Response> => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: (header: string) => {
        if (header === "Content-Type") return contentType;
        return null;
      },
    },
    json: () => Promise.resolve(data),
    body: contentType.includes("text/event-stream")
      ? {
          getReader: () => {
            let callCount = 0;
            const streamData = [
              {
                done: false,
                value: new TextEncoder().encode(
                  'data: {"lyrics":"Test lyrics part 1"}\n\n',
                ),
              },
              {
                done: false,
                value: new TextEncoder().encode(
                  'data: {"lyrics":" - continued"}\n\n',
                ),
              },
              {
                done: false,
                value: new TextEncoder().encode("data: [DONE]\n\n"),
              },
              { done: true, value: undefined },
            ];

            return {
              read: () => Promise.resolve(streamData[callCount++]),
            };
          },
        }
      : null,
  } as Response);
};

describe("Sidebar Component", () => {
  beforeEach(() => {
    // Reset all mocks
    jest.resetAllMocks();
  });

  test("renders sidebar with all sections", () => {
    render(<Sidebar />);

    // Check if the main title is rendered
    expect(
      screen.getByText("Let's Create Your Tech Tunes"),
    ).toBeInTheDocument();

    // Check if Newsletter section is rendered
    expect(screen.getByText("Newsletter")).toBeInTheDocument();

    // Check if Popular Tags section is rendered
    expect(screen.getByText("Popular Tags")).toBeInTheDocument();

    // Check if all tags are rendered
    const tags = [
      "JavaScript",
      "React",
      "CSS",
      "TypeScript",
      "Node.js",
      "Python",
      "Web Development",
    ];
    tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  test("allows user to input study notes", async () => {
    render(<Sidebar />);

    const textarea = screen.getByPlaceholderText(
      "Add your study notes here...",
    );
    await userEvent.type(textarea, "Testing React components");

    expect(textarea).toHaveValue("Testing React components");
  });

  test("shows loading state when generating lyrics", async () => {
    // Mock fetch to return a pending promise to keep the loading state active
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Sidebar />);

    // Input some text and submit the form
    const textarea = screen.getByPlaceholderText(
      "Add your study notes here...",
    );
    await userEvent.type(textarea, "React hooks tutorial");

    const submitButton = screen.getByText("Generate lyrics");
    fireEvent.click(submitButton);

    // Check if the button text changed to 'Generating...'
    expect(screen.getByText("Generating...")).toBeInTheDocument();

    // Check if the loading message is displayed
    expect(screen.getByText("Generating Lyrics...")).toBeInTheDocument();
  });

  test("handles traditional JSON response correctly", async () => {
    const user = userEvent.setup();

    // Mock the fetch response
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ lyrics: "Test lyrics content" }),
        headers: {
          get: (header: string) => {
            if (header === "Content-Type") return "application/json";
            return null;
          },
        },
      } as Response),
    );

    render(<Sidebar />);
    // Input some text and submit the form
    const textarea = screen.getByPlaceholderText(
      "Add your study notes here...",
    );
    const submitButton = screen.getByText("Generate lyrics");

    await act(async () => {
      await user.type(textarea, "React hooks tutorial");
      await user.click(submitButton);
    });

    // Wait for the lyrics to be displayed
    await waitFor(() => {
      expect(screen.getByText("Generated Lyrics:")).toBeInTheDocument();
    });

    expect(screen.getByText("Test lyrics content")).toBeInTheDocument();

    // Check if fetch was called with the correct parameters
    expect(global.fetch).toHaveBeenCalledWith("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studyNotes: "React hooks tutorial" }),
    });
  });

  test("handles streaming response correctly", async () => {
    // Mock the fetch response with streaming content
    mockFetch.mockImplementation(() =>
      mockFetchResponse(200, null, "text/event-stream"),
    );

    render(<Sidebar />);

    // Input some text and submit the form
    const textarea = screen.getByPlaceholderText(
      "Add your study notes here...",
    );
    await userEvent.type(textarea, "React streaming test");

    const submitButton = screen.getByText("Generate lyrics");
    fireEvent.click(submitButton);

    // Wait for the streaming response to be processed
    await waitFor(() => {
      expect(screen.getByText("Generated Lyrics:")).toBeInTheDocument();
      expect(
        screen.getByText("Test lyrics part 1 - continued"),
      ).toBeInTheDocument();
    });
  });

  test("handles error response correctly", async () => {
    const user = userEvent.setup();

    // Mock a failed fetch response
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: "Server error" }),
        headers: {
          get: (header: string) => {
            if (header === "Content-Type") return "application/json";
            return null;
          },
        },
      } as Response),
    );

    render(<Sidebar />);

    // Input some text and submit the form
    const textarea = screen.getByPlaceholderText(
      "Add your study notes here...",
    );
    const submitButton = screen.getByText("Generate lyrics");

    await act(async () => {
      await user.type(textarea, "Error test");
      await user.click(submitButton);
    });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText("Failed to generate lyrics. Please try again."),
      ).toBeInTheDocument();
    });
  });

  test("tag links have correct href attributes", () => {
    render(<Sidebar />);

    const tags = [
      "JavaScript",
      "React",
      "CSS",
      "TypeScript",
      "Node.js",
      "Python",
      "Web Development",
    ];

    tags.forEach((tag) => {
      const tagLink = screen.getByText(tag);
      expect(tagLink).toHaveAttribute("href", `/tag/${tag.toLowerCase()}`);
    });
  });

  //This test may be removed if i decide to remove the newletter
  test("newsletter form has correct elements", () => {
    render(<Sidebar />);

    // Check if the email input exists
    const emailInput = screen.getByPlaceholderText("Your email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    // Check if the subscribe button exists
    const subscribeButton = screen.getByText("Subscribe");
    expect(subscribeButton).toBeInTheDocument();
    expect(subscribeButton).toHaveAttribute("type", "submit");
  });
});
