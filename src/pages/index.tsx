import { CardGrid } from '@/components/layout/cardGrid'
import { Cart } from '@/components/layout/cart'
import { Favorites } from '@/components/layout/favorites'
import { Navbar } from '@/components/navigation/navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Favorites />
      <Cart />
      <Navbar />
      <CardGrid />
    </>
  )
}
