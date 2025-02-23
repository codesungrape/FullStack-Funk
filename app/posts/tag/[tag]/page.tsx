import { posts } from '@/data/posts';
import BlogCard from '@/components/blog-card/blog-card';
import styles from './page.module.css'


export default function TagPage({ params }: { params: { tag: string } }) {
    const tag = decodeURIComponent(params.tag);

    const relatedPosts = posts.filter( post => 
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );

    return (
        <div className={styles.tagPage}>
            <h1>Posts tagged with &apos;{tag}&apos;</h1>
            <div className={styles.postGrid}>
                {relatedPosts.map(post => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}

