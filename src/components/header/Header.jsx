import Image from 'next/image'
import Link from 'next/link'

import logo from '@/images/logo/logo.svg'
import userFallback from '@/images/user-fallback.png'

import styles from './Header.module.css'

export default function Header() {
  let user = null

  return (
    <header>
      <div className={styles.header}>
        <Link href={'/'}>
          <Image
            className={styles.logo}
            alt='Logo'
            src={logo}
            height='21'
            width='200'
          />
        </Link>
        <figure className={styles.user__container}>
          <Image
            className={styles.user__image}
            alt='Logo'
            src={user ?? userFallback}
            height='40'
            width='40'
          />
        </figure>
      </div>
    </header>
  )
}
