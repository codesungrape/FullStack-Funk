import BlogCard from "@/components/blog-card/blog-card";
import Layout from "@/components/page-layout/page-layout";
import styles from "./page.module.css";
import { posts } from "@/data/posts";

export default function Home() {
  return (
    <Layout>
      <section className={styles.hero}>
        <h1>Full-Stack Funk</h1>
        <p>Code concepts turned catchy tunes - sing along, learn along!</p>
      </section>

      <section className={styles.featured}>
        <h2>Featured Posts</h2>
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
