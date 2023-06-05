import React from 'react';
import { ArrowLeftCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { enterScreenAnimationVariantes } from '@/utils/enterScreenAnimationVariantes';
import { Wrapper } from '@/components/form/controllers/input/wrapper';
import { RegisterForm, RegisterFormFields } from '@/components/form/registerForm';
import { auth, database } from '@/lib/firebase';


export default function CreateAccount() {
  const { back } = useRouter();

  async function onSubmit(data: RegisterFormFields) {
    const res = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (!res.user) return;

    await addDoc(collection(database, 'users'), {
      uid: res.user.uid,
      email: res.user.email,
      name: data.name,
      createdAt: new Date().getMilliseconds(),
      updatedAt: new Date().getMilliseconds(),
    });

    back();
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
            onClick={() => back()}
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
          onSubmit={onSubmit}
        />
      </Wrapper>
    </motion.div>
  )
}
