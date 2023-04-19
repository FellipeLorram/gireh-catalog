import { CardGrid } from '@/components/layout/cardGrid'
import { Cart } from '@/components/layout/cart'
import { Favorites } from '@/components/layout/favorites'
import { Navbar } from '@/components/navigation/navbar'
import { CheckCircle2 } from 'lucide-react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Favorites />
      <Cart />
      <Navbar />
      <CardGrid />
      <div className='fixed bottom-2 w-full flex justify-center'>
        <button className='p-2 px-4 bg-zinc-800 text-md w-fit text-white-200 rounded-3xl flex items-center justify-center gap-2'>
          <CheckCircle2 strokeWidth={1} size={18} className='stroke-white-200' />
          Solicitar Atendimento
        </button>
      </div>
    </>
  )
}
