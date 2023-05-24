import React from 'react';
import { motion } from 'framer-motion';
import { enterScreenAnimationVariantes } from '@/utils/enterScreenAnimationVariantes';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { Wrapper } from '@/components/form/controllers/input/wrapper';
import { RegisterForm, RegisterFormFields } from '@/components/form/registerForm';


export default function CreateAccount() {
  const { back } = useRouter();

  async function onSubmit(data: RegisterFormFields) {
    
  }

  return (
    <motion.div
      initial={enterScreenAnimationVariantes.hidden}
      animate={enterScreenAnimationVariantes.animate}
      exit={enterScreenAnimationVariantes.exit}
      className='w-full relative min-h-screen flex-col flex items-center justify-center p-4'
    >
      <Wrapper>
        <div className='flex w-full'>
          <motion.div
            onClick={back}
            whileTap={{ scale: 0.9 }}
            className='flex items-center justify-center w-8 h-8 rounded-full'
          >
            <ArrowLeftCircle size={24} className='stroke-zinc-600' />
          </motion.div>
        </div>

        <h1
          className='text-zinc-900 text-3xl mt-6 mb-4'
        >
          Criar conta
        </h1>

        <RegisterForm 
          onSubmit={() => {}}
        />
      </Wrapper>
    </motion.div>
  )
}
