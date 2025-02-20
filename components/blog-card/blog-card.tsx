// import Image from "next/image"
import Link from "next/link"
import styles from "./blog-card.module.css"
import { Post } from "@/data/posts"
import Image from "next/image"



export default function BlogCard(post: Post) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <Image 
        src={post.image} 
        alt={post.title} 
        width={800}  // Add appropriate width
        height={400} // Add appropriate height
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.metadata}>
          <div className={styles.author}>
            <Image 
            src={post.author.avatar} 
            alt={post.author.name} 
            width={800}  // Add appropriate width
            height={400} // Add appropriate height
            />
            <span>{post.author.name}</span>
          </div>
          <time>{post.date}</time>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}






