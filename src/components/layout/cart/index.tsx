import React from 'react'
import { FavoritesAndCartLayoutWrapper } from '../cartAndFavoritesWrapper'
import { CartOpenAtom } from '@/context/appContext'
import { ShoppingBag, CheckCircle2 } from 'lucide-react'

export function Cart() {

  return (
    <FavoritesAndCartLayoutWrapper
      OpenAtom={CartOpenAtom}
    >
      <div className='flex w-full flex-col items-center justify-between h-full'>
      
        <div className='flex w-full flex-row gap-2 items-center justify-start mt-8 pb-2 border-b border-zinc-200'>
          <ShoppingBag strokeWidth={1} size={18} className='stroke-zinc-600' />
          <h1 className='text-zinc-600'>Carrinho</h1>
        </div>

        <button className='p-2 px-4 bg-zinc-800 text-md w-fit text-white-200 rounded-3xl flex items-center justify-center gap-2'>
          <CheckCircle2 strokeWidth={1} size={18} className='stroke-white-200' />
          Solicitar Atendimento
        </button>
      
      </div>
    </FavoritesAndCartLayoutWrapper>
  )
}
