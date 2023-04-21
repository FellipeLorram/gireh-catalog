import React from 'react'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion';
import { FavoritesAndCartLayoutWrapper } from '../cartAndFavoritesWrapper'
import { CartAtom, CartOpenAtom } from '@/context/appContext'
import { useAtom } from 'jotai';

const variants = {
  animate: {
    rotate: [0, 10, 0, -10, 0],
    transition: {
      delay: 0.5,
    }
  }
}

export function Cart() {
  const [cartItems] = useAtom(CartAtom);
  return (
    <FavoritesAndCartLayoutWrapper
      OpenAtom={CartOpenAtom}
    >
      <div className='flex w-full flex-col items-center justify-start h-full'>
        <div className='flex w-full flex-row gap-2 items-center justify-start mt-8 pb-2 border-b border-zinc-200'>
          <ShoppingBag strokeWidth={1} size={18} className='stroke-zinc-600' />
          <h1 className='text-zinc-600'>Carrinho</h1>
        </div>

        {cartItems.length > 0 ? (
          <></>
        ) : (
          <EmptyCart />
        )}
      </div >
    </FavoritesAndCartLayoutWrapper>
  )
}

function EmptyCart() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center mt-24'>
      <motion.div
        variants={variants}
      >
        <ShoppingCart strokeWidth={1} size={36} className='stroke-zinc-400' />
      </motion.div>
      <p className='text-zinc-600'>
        Seu carrinho ainda está vazio.
      </p>
    </div>
  )
}