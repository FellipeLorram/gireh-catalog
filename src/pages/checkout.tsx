import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';
import { motion } from 'framer-motion'
import { addDoc, collection } from 'firebase/firestore';

import CheckoutForm, { CheckoutFormFields } from '@/components/form/checkoutForm';
import { Wrapper } from '@/components/layout/wrapper';
import { database } from '@/lib/firebase';
import CheckoutScreenAnimate from '@/components/svg/CheckoutScreenAnimate';
import { useAtom } from 'jotai';
import { CartAtom, FavoritesAtom } from '@/context/appContext';
import { useRouter } from 'next/router';

const variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function Chekckout() {
  const [loading, setLoading] = useState(false);
  const [cartItems] = useAtom(CartAtom);
  const [favoritesItems] = useAtom(FavoritesAtom);
  const {push} = useRouter();

  async function handleSubmit(data: CheckoutFormFields) {
    setLoading(true);
    await addDoc(collection(database, 'leads'), {
      name: data.name,
      phone: data.phone,
      cart: cartItems.map((item) => item.id),
      favorites: favoritesItems.map((item) => item.id),
      createdAt: new Date().getMilliseconds(),
    });
    setLoading(false);
    push('/checkout-confirm');
  }

  return (
    <Wrapper>
      <motion.div
        variants={variants}
        initial='hidden'
        animate='animate'
        exit='hidden'
        className='w-full items-center justify-start flex flex-col p-4 text-center h-screen gap-4'
      >
        <div className='flex flex-row w-full items-center justify-center'>
          <Link href='/catalog'>
            <ArrowLeftCircle
              size={24}
              className='stroke-zinc-900'
              strokeWidth={1}
            />
          </Link>
          <p className='font-jakarta text-xl flex-1 text-center'>Finalizar Atendimento</p>
        </div>

        <div className='w-full flex flex-col gap-4 h-full items-center justify-start'>
          <CheckoutScreenAnimate
            className='w-1/2'
          />
          <p className='text-sm'>
            Precisamos de algumas informações para que possamos entrar em contato e finalizar o seu atendimento.
          </p>
          <CheckoutForm
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </motion.div>
    </Wrapper>
  )
}
