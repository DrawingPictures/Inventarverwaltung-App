//src/app/dashboard/layout.tsx
import Link from "next/link";
import styles from './dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      {/* Gemeinsame Sidebar mit Next.js <Link>-Komponenten für flüssigen Routing-Wechsel */}
      <aside className={styles.sidebar}>
        <div className={styles.navGroup}>
          <Link href="/dashboard" className={styles.navButton}>
          Dashboard
          </Link>
          <Link href="/dashboard/product" className={styles.navButton}>
          Product
          </Link>
          <Link href="/dashboard/company" className={styles.navButton}>
          Company
          </Link>
          <Link href="/dashboard/user" className={styles.navButton}>
          User
          </Link>
        </div>
      </aside>

      {/* Hauptbereich, in den sich die entsprechenden Sub-Pages einfügen */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}