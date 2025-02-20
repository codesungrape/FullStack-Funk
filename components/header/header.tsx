"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../app/providers/theme-provider"
import styles from "./header.module.css"

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          Full-stack Funk
        </a>
        <nav className={styles.nav}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {/* button doesnt lead to anywhere right now */}
          <button className={styles.authButton}>Sign In</button> 
        </nav>
      </div>
    </header>
  )
}

