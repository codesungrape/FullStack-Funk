"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../app/providers/theme-provider";
import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Full-stack Funk
        </Link>
        <nav className={styles.nav}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* button doesnt lead to anywhere right now- func to be added later with security elements/supabase auth
          <button className={styles.authButton}>Sign In</button>  */}
        </nav>
      </div>
    </header>
  );
}
