import type React from "react"
import Sidebar from "../sidebar/sidebar"
import styles from "./page-layout.module.css"

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Sidebar />
    </div>
  )
}

