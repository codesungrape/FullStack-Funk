import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TagPage from './page';


// Define the Post type to match your actual Post type
interface Post {
  slug: string;
  title: string;
  tags: string[];
  // Add other fields that your actual Post type has
}

// MOck the BlogCard component 
jest.mock('@/components/blog-card/blog-card', () => {
    return function MockBlogCard({ post }: { post: Post }) {
        return <div data-testid="blog-card">{post.title}</div>
    }
})


// Mock posts data - Note the proper export syntax
jest.mock('@/data/posts', () => ({
    posts: [
      {
        slug: 'post-1',
        title: 'Post 1',
        tags: ['react', 'typescript'],
      },
      {
        slug: 'post-2',
        title: 'Post 2',
        tags: ['react', 'nextjs'],
      },
      {
        slug: 'post-3',
        title: 'Post 3',
        tags: ['typescript'],
      },
    ],
  }));

describe('TagPage', () => {
    it('renders the tag name in the heading', () => {
        render(<TagPage params={{ tag: 'react' }}/>);

        const heading = screen.getByRole('heading', {
            name: /Posts tagged with 'react'/i,
          });
          expect(heading).toBeInTheDocument();
    })
    it('handles URL-encoded tag parameters correctly', () => {
        render(<TagPage params={{ tag: 'next%20js' }} />);
        
        const heading = screen.getByRole('heading', {
          name: /Posts tagged with 'next js'/i,
        });
        expect(heading).toBeInTheDocument();
      });
      it('displays blog cards for posts with matching tags', () => {
        render(<TagPage params={{ tag: 'react' }} />);
        
        const blogCards = screen.getAllByTestId('blog-card');
        expect(blogCards).toHaveLength(2); // Should show Post 1 and Post 2
        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
      });
      it('displays no blog cards when no posts match the tag', () => {
        render(<TagPage params={{ tag: 'nonexistent' }} />);
        
        const blogCards = screen.queryAllByTestId('blog-card');
        expect(blogCards).toHaveLength(0);
      });
    it('filters posts correctly for a tag with single match', () => {
        render(<TagPage params={{ tag: 'nextjs' }} />);
        
        const blogCards = screen.getAllByTestId('blog-card');
        expect(blogCards).toHaveLength(1); // should be 1
        expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    it('applies the correct CSS module classes', () => {
        const { container } = render(<TagPage params={{ tag: 'react' }} />);
        
        // More specific selectors
        const tagPageDiv = container.firstChild as HTMLElement;
        const postGridDiv = container.querySelector('[class*="postGrid"]');
        
        expect(tagPageDiv).toHaveClass('tagPage');
        expect(postGridDiv).toHaveClass('postGrid');
        expect(tagPageDiv).toBeInTheDocument(); // Additional assertion
        expect(postGridDiv).toBeInTheDocument(); // Additional assertion
      });
})