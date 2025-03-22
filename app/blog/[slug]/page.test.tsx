import { render, screen } from "@testing-library/react";
import BlogPost, { generateMetadata, generateStaticParams } from "./page";
import { notFound } from "next/navigation";
import type { ImageProps } from "next/image";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src as string}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

// Mock Layout component
jest.mock("@/components/page-layout/page-layout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

// Mock posts data
jest.mock("@/data/posts", () => ({
  posts: [
    {
      slug: "test-post",
      title: "Test Post",
      excerpt: "Test excerpt",
      date: "2024-02-21",
      readTime: "5 min read",
      tags: ["test", "music"],
      lyrics: "Test lyrics",
      author: {
        name: "Test Author",
        avatar: "/test-avatar.jpg",
      },
      song: {
        title: "Test Song",
        artist: "Test Artist",
        coverArt: "/test-cover.jpg",
        url: "/test-song.mp3",
      },
    },
  ],
}));

describe("BlogPost Page", () => {
  describe("generateMetadata", () => {
    it("should generate correct metadata for existing post", () => {
      const params = { slug: "test-post" };
      const metadata = generateMetadata({ params });

      expect(metadata).toEqual({
        title: "Test Song - Test Post",
        description: "Test excerpt",
      });
    });

    it("should generate not found metadata for non-existent post", () => {
      const params = { slug: "non-existent" };
      const metadata = generateMetadata({ params });

      expect(metadata).toEqual({
        title: "Post Not Found",
        description: "The requested blog post could not be found",
      });
    });
  });

  describe("generateStaticParams", () => {
    it("should generate params for all posts", () => {
      const params = generateStaticParams();
      expect(params).toEqual([{ slug: "test-post" }]);
    });
  });

  describe("BlogPost component", () => {
    it("should render complete blog post for valid slug", () => {
      render(<BlogPost params={{ slug: "test-post" }} />);

      // Check if main elements are rendered
      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(screen.getByAltText("Test Song cover art")).toBeInTheDocument();
      expect(screen.getByText("Test Song")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();

      // Check audio player
      const audioPlayer = screen.getByTestId("audio-player");
      expect(audioPlayer).toBeInTheDocument();
      expect(audioPlayer).toHaveAttribute("src", "/test-song.mp3");

      // Check post content
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("Test Author")).toBeInTheDocument();
      expect(screen.getByText("2024-02-21")).toBeInTheDocument();
      expect(screen.getByText("5 min read")).toBeInTheDocument();

      // Check tags
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("music")).toBeInTheDocument();

      // Check description and lyrics
      expect(screen.getByText("About this lesson")).toBeInTheDocument();
      expect(screen.getByText("Test excerpt")).toBeInTheDocument();
      expect(screen.getByText("Lyrics")).toBeInTheDocument();
      expect(screen.getByText("Test lyrics")).toBeInTheDocument();
    });

    it("should call notFound for invalid slug", () => {
      // Save original console.error
      const originalError = console.error;
      
      // Mock console.error to suppress expected errors
      console.error = jest.fn();
      expect(() => {
        render(<BlogPost params={{ slug: "non-existent" }} />);
      }).toThrow("NEXT_NOT_FOUND");
      expect(notFound).toHaveBeenCalled();

      // Restore original console.error
      console.error = originalError;
    });

    it("should render within layout component", () => {
      render(<BlogPost params={{ slug: "test-post" }} />);
      expect(screen.getByTestId("layout")).toBeInTheDocument();
    });

    it("should render author avatar with correct attributes", () => {
      render(<BlogPost params={{ slug: "test-post" }} />);
      const avatar = screen.getByAltText("Test Author");
      expect(avatar).toHaveAttribute("width", "40");
      expect(avatar).toHaveAttribute("height", "40");
    });

    it("should render cover art with correct attributes", () => {
      render(<BlogPost params={{ slug: "test-post" }} />);
      const coverArt = screen.getByAltText("Test Song cover art");
      expect(coverArt).toHaveAttribute("width", "300");
      expect(coverArt).toHaveAttribute("height", "300");
    });
  });
});
