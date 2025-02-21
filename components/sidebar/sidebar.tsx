import styles from "./sidebar.module.css"

export default function Sidebar() {
  const tags = ["JavaScript", "React", "CSS", "TypeScript", "Node.js", "Python", "Web Development"]

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
        <h3 className={styles.sectionTitle}>Share Your Tech Tunes</h3>
        <form className={styles.submission}>
          <p>Got a coding concept that needs a melody? Submit your tech-educational lyrics for review!</p>
          <input type="text" placeholder="Song title" />
          <textarea placeholder="Paste your lyrics here..." rows={4} />
          <input type="file" accept="audio/*" className={styles.fileInput} />
          <small className={styles.hint}>Optional: Include a demo recording (MP3)</small>
          <button type="submit">Submit for Review</button>
        </form>
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

