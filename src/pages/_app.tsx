import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

const inter = Montserrat({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${jakarta.variable} font-sans`}>
      <AnimatePresence mode='wait'>
        <Component {...pageProps} />
      </AnimatePresence>
    </main>
  )
}