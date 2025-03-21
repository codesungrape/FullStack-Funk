import { render, screen } from "@testing-library/react";
import Home from "./page";
import { posts } from "@/data/posts";

// Define the type for BlogCard props based on usage in the component
type BlogCardProps = {
  post: {
    title: string;
    excerpt: string;
    song: {
      title: string;
      artist: string;
      url: string;
      coverArt: string;
    };
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    readTime: string;
    tags: string[];
    slug: string;
  };
};

// Mock the components and modules
jest.mock("@/components/blog-card/blog-card", () => {
  return function MockBlogCard({ post }: BlogCardProps) {
    return (
      <div
        data-testid="blog-card"
        data-slug={post.slug}
        data-title={post.title}
        data-cover-art={post.song.coverArt} // Changed this from image to coverArt
        data-excerpt={post.excerpt}
        data-author-name={post.author.name}
        data-author-avatar={post.author.avatar}
        data-date={post.date}
        data-read-time={post.readTime}
      />
    );
  };
});

jest.mock("@/components/page-layout/page-layout", () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the hero section with correct content", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Full-Stack Funk");

    const description = screen.getByText(
      "Code concepts turned catchy tunes - sing along, learn along!",
    );
    expect(description).toBeInTheDocument();
  });
  it("renders the featured section with correct heading", () => {
    render(<Home />);

    const featuredHeading = screen.getByRole("heading", { level: 2 });
    expect(featuredHeading).toHaveTextContent("Featured Posts");
  });
  it("renders the correct number of BlogCard components", () => {
    render(<Home />);

    const blogCards = screen.getAllByTestId("blog-card");
    expect(blogCards).toHaveLength(posts.length);
  });
  it("passes correct props to BlogCard components", () => {
    render(<Home />);

    const blogCards = screen.getAllByTestId("blog-card");

    blogCards.forEach((card, index) => {
      const post = posts[index];
      //console.log('Full post object:', JSON.stringify(post, null, 2))

      expect(card).toHaveAttribute("data-slug", post.slug);
      expect(card).toHaveAttribute("data-title", post.title);
      expect(card).toHaveAttribute("data-excerpt", post.excerpt);
      expect(card).toHaveAttribute("data-author-name", post.author.name);
      expect(card).toHaveAttribute("data-author-avatar", post.author.avatar);
      expect(card).toHaveAttribute("data-date", post.date);
      expect(card).toHaveAttribute("data-read-time", post.readTime);
    });
  });
  it("renders within Layout component", () => {
    render(<Home />);

    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();
  });
  it("applies correct CSS classes", () => {
    render(<Home />);

    const heroSection = screen.getByRole("heading", { level: 1 }).parentElement;
    expect(heroSection).toHaveClass("hero");

    const featuredSection = screen.getByRole("heading", {
      level: 2,
    }).parentElement;
    expect(featuredSection).toHaveClass("featured");

    const grid = screen.getAllByTestId("blog-card")[0].parentElement;
    expect(grid).toHaveClass("grid");
  });
});
