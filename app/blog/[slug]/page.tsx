import Image from 'next/image'
import { notFound } from 'next/navigation'
import styles from './page.module.css'
import { posts } from '@/data/posts'
import Layout from '@/components/page-layout/page-layout'
import { Metadata } from 'next'

type Props = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((post) => post.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    }
  }

  return {
    title: `${post.song.title} - ${post.title}`,
    description: post.excerpt
  }
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export default function BlogPost({ params }: Props) {
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className={styles.article}>
        <div className={styles.songHeader}>
          <Image 
            src={post.song.coverArt} 
            alt={`${post.song.title} cover art`}
            width={300}
            height={300}
            className={styles.coverArt}
          />
          <div className={styles.songInfo}>
            <div className={styles.songMeta}>
              <h2 className={styles.songTitle}>{post.song.title}</h2>
              <p className={styles.artist}>{post.song.artist}</p>
            </div>
            {/* Optional: Add audio player if you want to include the actual song */}
            <audio
              controls
              className={styles.audioPlayer}
              src={post.song.url}
            />
          </div>
        </div>
        
        <div className={styles.content}>
          <h1>{post.title}</h1>
          
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

          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.description}>
            <h3>About this lesson</h3>
            <p>{post.excerpt}</p>
          </div>

          <div className={styles.lyrics}>
            <h3>Lyrics</h3>
            <pre className={styles.lyricsText}>
              {post.lyrics}
            </pre>
          </div>
        </div>
      </article>
    </Layout>
  )
}