"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import styles from "./header.module.css"

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          EduBlog
        </a>
        <nav className={styles.nav}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className={styles.authButton}>Sign In</button>
        </nav>
      </div>
    </header>
  )
}

