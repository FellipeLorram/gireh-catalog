import { CartAtom, FavoritesAtom } from '@/context/appContext'
import { getDataFromLocalStorage, saveDataToLocalStorage } from '@/context/localStorage'
import { Product } from '@/lib/entities/product'
import '@/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import type { AppProps } from 'next/app'
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google'
import { useEffect } from 'react'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

const inter = Montserrat({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const [cartItems, setCartItems] = useAtom(CartAtom);
  const [favoritesItems, setFavoritesItems] = useAtom(FavoritesAtom);

  useEffect(() => {
    const localCartItems = getDataFromLocalStorage('cartItems') as Product[];
    const localFavoritesItems = getDataFromLocalStorage('favoritesItems') as Product[];
    
    if(!localCartItems) saveDataToLocalStorage('cartItems', []);
    if(!localFavoritesItems) saveDataToLocalStorage('favoritesItems', []);

    return

    if (localCartItems.length > 0) {
      setCartItems(localCartItems);
    }

    if (localFavoritesItems.length > 0) {
      setFavoritesItems(localFavoritesItems);
    }

  }, []);
  
  useEffect(() => {
    saveDataToLocalStorage('cartItems', cartItems);
    saveDataToLocalStorage('favoritesItems', favoritesItems);
  }, [
    cartItems,
    favoritesItems,
  ]);


  return (
    <main className={`${inter.variable} ${jakarta.variable} font-sans`}>
      <AnimatePresence mode='wait'>
        <Component {...pageProps} />
      </AnimatePresence>
    </main>
  )
}