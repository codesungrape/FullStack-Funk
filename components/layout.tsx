import type React from "react"
import Sidebar from "./sidebar"
import styles from "./layout.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Sidebar />
    </div>
  )
}

