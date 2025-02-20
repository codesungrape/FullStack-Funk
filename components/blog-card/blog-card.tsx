// import Image from "next/image"
import Link from "next/link"
import styles from "./blog-card.module.css"
import { Post } from "@/data/posts"

type BlogCardProps = {
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  tags: string[]
  image: string
  slug: string
}

export default function BlogCard(post: Post) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <img 
        src={post.image} 
        alt={post.title} 
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.metadata}>
          <div className={styles.author}>
            <img src={post.author.avatar} alt={post.author.name} />
            <span>{post.author.name}</span>
          </div>
          <time>{post.date}</time>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}






