/* eslint-disable @next/next/no-img-element */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogCard from './blog-card';
import { Post } from '@/data/posts';
import styles from './blog-card.module.css';

// Mock next/image correctly
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

// Mock CSS module
jest.mock('./blog-card.module.css', () => ({
  card: 'card',
  image: 'image',
  content: 'content',
  title: 'title',
  excerpt: 'excerpt',
  metadata: 'metadata',
  author: 'author',
}));


describe('BlogCard', () => {
  const mockPost: Post = {
    slug: 'test-post',
    title: 'Test Blog Post',
    excerpt: 'This is a test excerpt',
    image: '/test-image.jpg',
    date: '2024-02-20',
    readTime: '5 min read',
    author: {
      name: 'John Doe',
      avatar: '/avatar.jpg',
    },
    tags: ['test', 'blog'],
  };

  it('renders blog post information correctly', () => {
    render(<BlogCard {...mockPost} />);

    // Check title
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();

    // Check excerpt
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();

    // Check author info
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check metadata
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders images with correct src and alt text', () => {
    render(<BlogCard {...mockPost} />);

    // Check main blog image
    const mainImage = screen.getByAltText('Test Blog Post');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', '/test-image.jpg');

    // Check author avatar
    const avatarImage = screen.getByAltText('John Doe');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', '/avatar.jpg');
  });

  it('links to the correct blog post URL', () => {
    render(<BlogCard {...mockPost} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders with missing data gracefully', () => {
    const incompletePost: Post = {
      ...mockPost,
      excerpt: '',
      readTime: '',
      author: {
        name: '',
        avatar: '',
      },
    };

    render(<BlogCard {...incompletePost} />);

    // Should still render without crashing
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('maintains correct DOM hierarchy', () => {
    render(<BlogCard {...mockPost} />);

    const link = screen.getByRole('link');
    const content = document.querySelector(`.${styles.content}`);
    const metadata = document.querySelector(`.${styles.metadata}`);

    expect(content).toBeInTheDocument();
    expect(metadata).toBeInTheDocument();
    expect(content?.parentElement).toBe(link);
    expect(metadata?.parentElement).toBe(content);
  });
});



      //   it('applies correct CSS classes', () => {
    //     render(<BlogCard {...mockPost} />);
    
    //     // Check if main elements have correct classes
    //     expect(screen.getByRole('link')).toHaveClass('card');
    //     expect(screen.getByAltText('Test Blog Post')).toHaveClass('image');
    //     expect(screen.getByText('Test Blog Post').parentElement).toHaveClass('title');
    //     expect(screen.getByText('This is a test excerpt')).toHaveClass('excerpt');
    //   });