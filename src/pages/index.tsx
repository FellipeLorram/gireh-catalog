import { CheckoutButton } from '@/components/button/checkoutButton'
import { CardGrid } from '@/components/layout/cardGrid'
import { Cart } from '@/components/layout/cart'
import { Favorites } from '@/components/layout/favorites'
import { Navbar } from '@/components/navigation/navbar'
import { MockProductsData } from '@/utils/mockProductsData'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Favorites />
      <Cart />
      <CheckoutButton />
      <Navbar />
      <CardGrid products={MockProductsData} />
    </>
  )
}
