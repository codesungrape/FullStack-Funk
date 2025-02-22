"use client"

import Link from "next/link"
import Image from "next/image"
import styles from "./blog-card.module.css"
import { Post } from "@/data/posts"

type BlogCardProps = {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {

  // prevent event bubbling when clking tags 
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault(); 
    window.location.href = `/posts/tag/${encodeURIComponent(tag)}`
  }

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.songSection}>
        <div className={styles.songInfo}>
          <span className={styles.songIcon}>♪</span>
          <h3 className={styles.songTitle}>{post.song.title}</h3>
          <p className={styles.artist}>{post.song.artist}</p>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        
        <div className={styles.lyricsPreview}>
          <h4>Preview Lyrics:</h4>
          <p data-testid="lyrics-preview">
          {`${post.lyrics.split('\n').slice(0, 4).join('\n')}\n...`}</p>
        </div>

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <button 
              key={tag} 
              className={styles.tag}
              onClick={(e) => handleTagClick(e, tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.metadata}>
          <div className={styles.author}>
            <Image 
              src={post.author.avatar} 
              alt={post.author.name} 
              width={40}
              height={40}
              className={styles.avatar}
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