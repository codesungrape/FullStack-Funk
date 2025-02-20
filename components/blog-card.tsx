import Image from "next/image"
import Link from "next/link"
import styles from "./blog-card.module.css"

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

export default function BlogCard({ title, excerpt, author, date, readTime, tags, image, slug }: BlogCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={image || "/placeholder.svg"} alt={title} width={800} height={400} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.author}>
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span>{author.name}</span>
          </div>
          <div className={styles.details}>
            <time>{date}</time>
            <span>{readTime} read</span>
          </div>
        </div>
        <Link href={`/blog/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

