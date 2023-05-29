import { Roboto } from 'next/font/google'

import Providers from '@/providers/providers'
import Header from '@/components/header/Header'
import NavBar from '@/components/navbar/NavBar'
import Footer from '@/components/footer/Footer'

import '@/styles/reset.css'
import '@/styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata = {
  title: 'Granero App',
  description: 'Manage your Jobs Offers'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </head>
      <body className={roboto.className}>
        <Providers>
          <Header />
          <main>
            {/* <NavBar /> */}
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
