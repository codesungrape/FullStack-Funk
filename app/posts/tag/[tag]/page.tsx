import { posts } from '@/data/posts';
import BlogCard from '@/components/blog-card/blog-card';


export default function TagPage({ params }: { params: { tag: string } }) {
    const tag = decodeURIComponent(params.tag);

    const relatedPosts = posts.filter( post => 
        post.tags.includes(tag)
    );

    return (
        <div>
            <h1>Posts tagged with "{tag}"</h1>
            <div>
                {relatedPosts.map(post => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )

}