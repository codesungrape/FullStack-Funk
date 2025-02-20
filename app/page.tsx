import BlogCard from "@/components/blog-card"
import Layout from "@/components/layout"
import styles from "./page.module.css"

const posts = [
  {
    title: "Understanding React Server Components",
    excerpt: "Learn how React Server Components work and how they can improve your application's performance...",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 15, 2024",
    readTime: "5 min",
    tags: ["React", "JavaScript", "Web Development"],
    image: "/placeholder.svg?height=400&width=800",
    slug: "understanding-react-server-components",
  },
  {
    title: "CSS Grid: A Complete Guide",
    excerpt: "Master CSS Grid layout with this comprehensive guide covering all the essential concepts...",
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 12, 2024",
    readTime: "8 min",
    tags: ["CSS", "Web Development", "Tutorial"],
    image: "/placeholder.svg?height=400&width=800",
    slug: "css-grid-complete-guide",
  },
  {
    title: "TypeScript Best Practices in 2024",
    excerpt: "Discover the latest TypeScript best practices and patterns to write better, more maintainable code...",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 10, 2024",
    readTime: "6 min",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    image: "/placeholder.svg?height=400&width=800",
    slug: "typescript-best-practices-2024",
  },
]

export default function Home() {
  return (
    <Layout>
      <section className={styles.hero}>
        <h1>Welcome to EduBlog</h1>
        <p>Discover the latest in web development and technology</p>
      </section>

      <section className={styles.featured}>
        <h2>Featured Posts</h2>
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

