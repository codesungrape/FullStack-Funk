export type Post = {
  title: string
  excerpt: string
  lyrics: string  // Instead of general content
  song: {
    title: string
    artist: string
    url: string
    coverArt: string  // Instead of a general image
  }
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  tags: string[]
  slug: string
}

export const posts: Post[] = [
  {
    title: "React Server Components Explained Through 'Digital Flow'",
    excerpt: "Learn React Server Components concepts through this tech-inspired song about client-server architecture...",
    lyrics: `Verse 1:
Server-side rendering, streaming through the night
Reducing bundle size, making it all light
No more heavy loads on the client side
Let the server handle it, watch performance rise...`,
    song: {
      title: "Digital Flow",
      artist: "The Server Side Band",
      url: "https://example.com/digital-flow.mp3",
      coverArt: "/placeholder.svg?height=200&width=200"  // Using placeholder instead
    },
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 15, 2024",
    readTime: "5 min",
    tags: ["React", "JavaScript", "Web Development"],
    slug: "react-server-components-digital-flow"
  },
  {
    title: "CSS Grid Rhythms: A Musical Guide to Layout",
    excerpt: "Master CSS Grid through the power of music, where columns and rows become beats and measures...",
    lyrics: `Verse 1:
Grid-template rising, two dimensions clear
Rows and columns dancing, layout patterns appear
Minmax and auto-fit, responsive by design
Flexbox joins the rhythm, keeping all aligned...`,
    song: {
      title: "Grid Groove",
      artist: "CSS Collective",
      url: "https://example.com/grid-groove.mp3",
      coverArt: "/placeholder.svg?height=200&width=200"  // Using placeholder instead
    },
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 12, 2024",
    readTime: "8 min",
    tags: ["CSS", "Web Development", "Tutorial"],
    slug: "css-grid-rhythms"
  },
  {
    title: "TypeScript Symphony: Best Practices in Code and Song",
    excerpt: "Discover TypeScript patterns through musical metaphors, where types flow like melodies...",
    lyrics: `Verse 1:
Strict mode enabled, catching errors with grace
Generics flowing, adapting time and space
Type guards standing watch, ensuring safety reigns
Union types uniting, breaking through the chains...`,
    song: {
      title: "Type Safety Dance",
      artist: "The Strict Mode Ensemble",
      url: "https://example.com/type-safety-dance.mp3",
      coverArt: "/placeholder.svg?height=200&width=200"  // Using placeholder instead
    },
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 10, 2024",
    readTime: "6 min",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    slug: "typescript-symphony"
  }
]