import Image from 'next/image'

import logo from '@/images/icons/granero.svg'

import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer__separator}></div>
      <div className={styles.footer__container}>
        <div>
          <Image
            className={styles.footer__logo}
            src={logo}
            alt='logo'
            width='32'
            height='32'
          />
        </div>
        <ul role='list' className={styles.footer__nav}>
          <li>
            <a href='#features'>Features</a>
          </li>
          <li>
            <a href='#Pricing'>Pricing</a>
          </li>
          <li>
            <a href='#Contact'>Contact</a>
          </li>
        </ul>
        <ul role='list' className={styles.footer__social}>
          <li className={styles.siguenos}>¡Síguenos!</li>
          <li>
            <a
              className={styles.link}
              href='https://www.facebook.com/InfoJobs'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className={styles.icon + ' ' + styles.facebook}></i>
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href='https://twitter.com/InfoJobs'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className={styles.icon + ' ' + styles.twitter}></i>
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href='https://www.youtube.com/user/InfoJobsNET'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className={styles.icon + ' ' + styles.youtube}></i>
            </a>
          </li>
        </ul>
      </div>
      <p className={styles.attribution}>
        Project Coded by{' '}
        <a href='https://github.com/JonatanGarbuyo'>Jonatan Garbuyo</a>.
      </p>
    </footer>
  )
}
