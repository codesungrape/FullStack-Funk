import { render, screen } from '@testing-library/react'
import Home from './page'
import { posts } from '@/data/posts'

// Define the type for BlogCard props based on usage in the component
type BlogCardProps = {
    slug: string
    title: string
    image: string
    excerpt: string
    author: {
      name: string
      avatar: string
    }
    date: string
    readTime: string
  }

// Mock the components and modules
jest.mock('@/components/blog-card/blog-card', () => {
  return function MockBlogCard(props: BlogCardProps) {
    return <div data-testid="blog-card" {...props} />
  }
})


jest.mock('@/components/page-layout/page-layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>
  }
})

describe('Home Page', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
  
    it('renders the hero section with correct content', () => {
      render(<Home />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Full-Stack Funk')
      
      const description = screen.getByText(
        'Learn through song where code meets melody-web dev, and funky tech tunes!'
      )
      expect(description).toBeInTheDocument()
    })
    it('renders the featured section with correct heading', () => {
        render(<Home />)
        
        const featuredHeading = screen.getByRole('heading', { level: 2 })
        expect(featuredHeading).toHaveTextContent('Featured Posts')
    })
    it('renders the correct number of BlogCard components', () => {
        render(<Home />)
        
        const blogCards = screen.getAllByTestId('blog-card')
        expect(blogCards).toHaveLength(posts.length)
    })
    it('passes correct props to BlogCard components', () => {
        render(<Home />)
        
        const blogCards = screen.getAllByTestId('blog-card')
        
        blogCards.forEach((card, index) => {
          expect(card).toHaveAttribute('slug', posts[index].slug)
          // You can add more prop checks based on your BlogCard component props
        })
    })
    it('renders within Layout component', () => {
        render(<Home />)
        
        const layout = screen.getByTestId('layout')
        expect(layout).toBeInTheDocument()
    })
    it('applies correct CSS classes', () => {
        render(<Home />)
        
        const heroSection = screen.getByRole('heading', { level: 1 }).parentElement
        expect(heroSection).toHaveClass('hero')
        
        const featuredSection = screen.getByRole('heading', { level: 2 }).parentElement
        expect(featuredSection).toHaveClass('featured')
        
        const grid = screen.getAllByTestId('blog-card')[0].parentElement
        expect(grid).toHaveClass('grid')
      })
  
  })