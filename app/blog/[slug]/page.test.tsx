import { render, screen } from '@testing-library/react'
import BlogPost, { generateMetadata, generateStaticParams } from './page'
import { posts } from '@/data/posts'
import { notFound } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  })
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} />
  )
}))

// Mock Layout component
jest.mock('@/components/page-layout/page-layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock post data
const mockPost = {
  slug: 'test-post',
  title: 'Test Post',
  image: '/test-image.jpg',
  author: {
    name: 'John Doe',
    avatar: '/avatar.jpg'
  },
  date: '2024-02-20',
  readTime: '5 min read',
  tags: ['test', 'blog'],
  excerpt: 'This is a test post excerpt'
}

describe('BlogPost', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the blog post when slug is found', () => {
    // Mock posts array to include our test post
    jest.spyOn(posts, 'find').mockReturnValue(mockPost)

    render(<BlogPost params={{ slug: 'test-post' }} />)

    // Check if main elements are rendered
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: mockPost.title })).toBeInTheDocument()
    expect(screen.getByText(mockPost.author.name)).toBeInTheDocument()
    expect(screen.getByText(mockPost.date)).toBeInTheDocument()
    expect(screen.getByText(mockPost.readTime)).toBeInTheDocument()
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument()

    // Check if tags are rendered
    mockPost.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })

    // Check if images are rendered with correct props
    const coverImage = screen.getByAltText(mockPost.title)
    expect(coverImage).toBeInTheDocument()
    expect(coverImage).toHaveAttribute('src', mockPost.image)

    const authorAvatar = screen.getByAltText(mockPost.author.name)
    expect(authorAvatar).toBeInTheDocument()
    expect(authorAvatar).toHaveAttribute('src', mockPost.author.avatar)
  })

  it('calls notFound when slug is not found', () => {
    // Mock posts array to return undefined (post not found)
    jest.spyOn(posts, 'find').mockReturnValue(undefined)

    // Expect the render to throw because notFound throws
    expect(() => {
      render(<BlogPost params={{ slug: 'non-existent-post' }} />)
    }).toThrow('NEXT_NOT_FOUND')

    // Check if notFound was called
    expect(notFound).toHaveBeenCalled()
  })

   it('renders with correct CSS classes', () => {
      jest.spyOn(posts, 'find').mockReturnValue(mockPost)
  
      const { container } = render(<BlogPost params={{ slug: 'test-post' }} />)
  
      // Check if elements have the correct CSS classes
      expect(container.querySelector('.article')).toBeInTheDocument()
      expect(container.querySelector('.coverImage')).toBeInTheDocument()
      expect(container.querySelector('.content')).toBeInTheDocument()
      expect(container.querySelector('.metadata')).toBeInTheDocument()
      expect(container.querySelector('.author')).toBeInTheDocument()
      expect(container.querySelector('.tags')).toBeInTheDocument()
      expect(container.querySelector('.tag')).toBeInTheDocument()
    })
})

  // Snapshot test
  it('matches snapshot', () => {
    jest.spyOn(posts, 'find').mockReturnValue(mockPost)
    
    const { container } = render(<BlogPost params={{ slug: 'test-post' }} />)
    expect(container).toMatchSnapshot()
  })

  describe('generateMetadata', () => {
    it('returns correct metadata for existing post', () => {
      jest.spyOn(posts, 'find').mockReturnValue(mockPost)
  
      const metadata = generateMetadata({ params: { slug: 'test-post' } })
  
      expect(metadata).toEqual({
        title: mockPost.title,
        description: mockPost.excerpt
      })
    })
  
    it('returns not found metadata for non-existent post', () => {
      jest.spyOn(posts, 'find').mockReturnValue(undefined)
  
      const metadata = generateMetadata({ params: { slug: 'non-existent' } })
  
      expect(metadata).toEqual({
        title: 'Post Not Found',
        description: 'The requested blog post could not be found'
      })
    })
  })
  
  describe('generateStaticParams', () => {
    it('returns correct params for all posts', () => {
      const mockPosts = [
        { ...mockPost, slug: 'post-1' },
        { ...mockPost, slug: 'post-2' }
      ]
      
      // Mock the entire posts array
      jest.spyOn(posts, 'map').mockImplementation(() => 
        mockPosts.map(post => ({ slug: post.slug }))
      )
  
      const params = generateStaticParams()
  
      expect(params).toEqual([
        { slug: 'post-1' },
        { slug: 'post-2' }
      ])
    })
  })