import Link from 'next/link'

import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <aside className={styles.nav_container}>
      <nav>
        <ul>
          <li>
            <Link href={'/offers'}>Offers</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
