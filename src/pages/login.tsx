import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Wrapper } from '@/components/layout/wrapper';
import { LoginForm } from '@/components/form/loginForm';
import { enterScreenAnimationVariantes } from '@/utils/enterScreenAnimationVariantes';
import { useRouter } from 'next/router';

export default function Login() {
  const { back } = useRouter();

  return (
    <div className='w-full flex flex-col items-start justify-center h-screen relative'>
      <div className='absolute top-4 right-4'>
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
        <motion.div
          initial={enterScreenAnimationVariantes.hidden}
          animate={enterScreenAnimationVariantes.animate}
          exit={enterScreenAnimationVariantes.exit}
        >
          <div className='flex items-center justify-center py-4 w-full'>
            <h1 className='text-zinc-900 text-6xl'>
              Girêh
            </h1>
          </div>
          <LoginForm />
        </motion.div>
      </Wrapper>
    </div>
  )
}
