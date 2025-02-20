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
    title: post.title,
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
        <Image 
          src={post.image} 
          alt={post.title}
          width={800}
          height={400}
          className={styles.coverImage}
        />
        
        <div className={styles.content}>
          <h1>{post.title}</h1>
          
          <div className={styles.metadata}>
            <div className={styles.author}>
              <Image 
                src={post.author.avatar} 
                alt={post.author.name}
                width={40}
                height={40}
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

          <p>{post.excerpt}</p>
        </div>
      </article>
    </Layout>
  )
}