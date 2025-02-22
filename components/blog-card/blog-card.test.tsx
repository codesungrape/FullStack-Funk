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
  songSection: 'songSection',
  songInfo: 'songInfo',
  songIcon: 'songIcon',
  songTitle: 'songTitle',
  artist: 'artist',
  content: 'content',
  title: 'title',
  excerpt: 'excerpt',
  lyricsPreview: 'lyricsPreview',
  tags: 'tags',
  tag: 'tag',
  metadata: 'metadata',
  author: 'author',
  avatar: 'avatar',
}));

describe('BlogCard', () => {
  const mockPost: Post = {
    slug: 'test-post',
    title: 'Test Blog Post',
    excerpt: 'This is a test excerpt',
    song: {
      title: 'Test Song',
      artist: 'Test Artist',
      url: 'https://example.com/song',
      coverArt: '/song-cover.jpg'
    },
    lyrics: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6',
    date: '2024-02-20',
    readTime: '5 min read', // Changed from readTime to readingTime
    author: {
      name: 'John Doe',
      avatar: '/avatar.jpg',
    },
    tags: ['pop', 'rock'],
  };

  it('renders blog post and song information correctly', () => {
    render(<BlogCard post={mockPost} />); // Changed to pass post as a prop

    // Check blog post info
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();

    // Check song info
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('♪')).toBeInTheDocument();
  });

  
  it('renders lyrics preview with correct number of lines', () => {
    render(<BlogCard post={mockPost} />);
    
    // Test section header
    expect(screen.getByText('Preview Lyrics:')).toBeInTheDocument();
    
    // Test preview content
    const lyricsPreview = screen.getByTestId('lyrics-preview');
    const previewLines = lyricsPreview.textContent?.split('\n');
    
    expect(previewLines).toHaveLength(5); // 4 lines + ellipsis
    expect(previewLines?.slice(0, 4)).toEqual([
      'Line 1',
      'Line 2',
      'Line 3',
      'Line 4'
    ]);
    expect(previewLines?.[4]).toBe('...');
  });

  it('renders tags correctly', () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText('pop')).toBeInTheDocument();
    expect(screen.getByText('rock')).toBeInTheDocument();
  });

  it('renders author and metadata correctly', () => {
    render(<BlogCard post={mockPost} />);

    // Check author info
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const avatarImage = screen.getByAltText('John Doe');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', '/avatar.jpg');

    // Check metadata
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('links to the correct blog post URL', () => {
    render(<BlogCard post={mockPost} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders with missing data gracefully', () => {
    const incompletePost: Post = {
      ...mockPost,
      excerpt: '',
      readTime: '', // Changed from readTime
      lyrics: '',
      song: {
        title: '',
        artist: '',
        url: '',
        coverArt: ''
      },
      author: {
        name: '',
        avatar: '',
      },
      tags: [],
    };

    render(<BlogCard post={incompletePost} />);

    // Should still render without crashing
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('maintains correct DOM hierarchy', () => {
    render(<BlogCard post={mockPost} />);

    const songSection = document.querySelector(`.${styles.songSection}`);
    const content = document.querySelector(`.${styles.content}`);
    const metadata = document.querySelector(`.${styles.metadata}`);

    expect(songSection).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(metadata).toBeInTheDocument();
    expect(songSection?.parentElement).toHaveClass(styles.card);
    expect(content?.parentElement).toHaveClass(styles.card);
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