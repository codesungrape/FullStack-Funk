/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@testing-library/react'
import BlogPost, { generateMetadata, generateStaticParams } from './page'
import { posts } from '@/data/posts'
import { notFound } from 'next/navigation'
import { ImageProps, StaticImageData } from 'next/image';



// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}))

// Mock next/image with explicit typing for the props
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: ImageProps) => (
    <img src={typeof src === 'string' ? src : (src as StaticImageData).src} alt={alt} className={className} />
  )
}))

// Mock Layout component
jest.mock('@/components/page-layout/page-layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('BlogPost', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all blog post components correctly', () => {
    const post = posts[0] // Using first post from actual data
    jest.spyOn(posts, 'find').mockReturnValue(post)

    render(<BlogPost params={{ slug: post.slug }} />)

    // Check main structural elements
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()

    // Check song section
    expect(screen.getByRole('heading', { name: post.song.title })).toBeInTheDocument()
    expect(screen.getByText(post.song.artist)).toBeInTheDocument()
    expect(screen.getByRole('audio')).toHaveAttribute('src', post.song.url)

    // Check metadata section
    expect(screen.getByText(post.author.name)).toBeInTheDocument()
    expect(screen.getByText(post.date)).toBeInTheDocument()
    expect(screen.getByText(post.readTime)).toBeInTheDocument()

    // Check content sections
    expect(screen.getByText(post.excerpt)).toBeInTheDocument()
    expect(screen.getByText(post.lyrics)).toBeInTheDocument()

    // Check images
    const coverArt = screen.getByAltText(`${post.song.title} cover art`)
    expect(coverArt).toBeInTheDocument()
    expect(coverArt).toHaveAttribute('src', post.song.coverArt)

    const avatar = screen.getByAltText(post.author.name)
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', post.author.avatar)

    // Check tags
    post.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it('calls notFound when post is not found', () => {
    jest.spyOn(posts, 'find').mockReturnValue(undefined)
    
    render(<BlogPost params={{ slug: 'non-existent' }} />)
    expect(notFound).toHaveBeenCalled()
  })
})


describe('generateMetadata', () => {
  it('returns combined song and post title for existing post', () => {
    const post = posts[0]
    jest.spyOn(posts, 'find').mockReturnValue(post)

    const metadata = generateMetadata({ params: { slug: post.slug } })

    expect(metadata).toEqual({
      title: `${post.song.title} - ${post.title}`,
      description: post.excerpt
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
  it('returns slug params for all posts', () => {
    const params = generateStaticParams()
    const expectedParams = posts.map(post => ({ slug: post.slug }))
    
    expect(params).toEqual(expectedParams)
  })
})