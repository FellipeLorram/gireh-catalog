import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowRightCircle, X } from 'lucide-react';
import { Wrapper } from '@/components/layout/wrapper';
import { LoginForm } from '@/components/form/loginForm';
import { enterScreenAnimationVariantes } from '@/utils/enterScreenAnimationVariantes';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const { back } = useRouter();

  return (
    <motion.div
      initial={enterScreenAnimationVariantes.hidden}
      animate={enterScreenAnimationVariantes.animate}
      exit={enterScreenAnimationVariantes.exit}
      className='w-full relative min-h-screen flex-col flex items-center justify-center'
    >

      <div className='absolute top-4 right-4 cursor-pointer'>
        <motion.div
          onClick={back}
          whileTap={{ scale: 0.9 }}
          className='flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100'
        >
          <X
            size={24}
            className='stroke-zinc-900'
            strokeWidth={1}
          />
        </motion.div>
      </div>


      <Wrapper>
        <div
          className='w-full flex flex-col items-center justify-center gap-4 h-full'
        >
          <div className='flex items-center justify-center py-4 w-full'>
            <h1 className='text-zinc-900 text-4xl'>
              Girêh
            </h1>
          </div>

          <LoginForm />
        </div>
      </Wrapper>
      <div className='absolute bottom-4 mx-auto'>
        <Link className='flex items-center justify-center gap-2' href='/register'>
          <p className='text-zinc-950 text-base font-medium pb-0.5'>
            Cadastro rápido
          </p>
          <ArrowRight className='stroke-zinc-950' size={20} />
        </Link>
      </div>
    </motion.div>
  )
}
