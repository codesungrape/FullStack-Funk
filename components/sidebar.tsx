import styles from "./sidebar.module.css"

export default function Sidebar() {
  const tags = ["JavaScript", "React", "CSS", "TypeScript", "Node.js", "Python", "Web Development"]

  const categories = ["Tutorials", "Guides", "Best Practices", "Career Advice", "Tools"]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Newsletter</h3>
        <form className={styles.newsletter}>
          <p>Get the latest posts delivered to your inbox</p>
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <ul className={styles.list}>
          {categories.map((category) => (
            <li key={category}>
              <a href={`/category/${category.toLowerCase()}`}>{category}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Popular Tags</h3>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <a key={tag} href={`/tag/${tag.toLowerCase()}`} className={styles.tag}>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

