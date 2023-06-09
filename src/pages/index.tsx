import React, { ReactNode, useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/buttons/button'
import Link from 'next/link'
import { TecnicalWorkers } from '@/components/svg/TecnicalWorkers'
import { PriceFriendly } from '@/components/svg/PriceFriendly'
import { TenYears } from '@/components/svg/TenYears'

const variants = {
  hidden: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    x: '-100vw',
    transition: {
      delay: 0.2,
    }
  },
}

export default function IndexScreen() {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    'Com mais de 10 anos de experiência, oferecemos atendimento técnico em ótica e soluções personalizadas para cuidar da sua visão.',
    'Nossos especialistas em ótica estão prontos para te ajudar a encontrar os óculos perfeitos. Conte com nosso atendimento amigável e personalizado!',
    'Praticamos preços justos e oferecemos óculos de qualidade. Garantimos soluções visuais que se encaixam no seu orçamento.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        if (prev === texts.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);


  return (
    <AnimatePresence mode='wait'>
      <motion.div
        variants={variants}
        initial='hidden'
        animate='animate'
        exit='exit'
        className='w-full h-screen flex flex-col items-center justify-between fixed bg-white-100 top-0 left-0 z-50 p-4'
      >
        <div className='flex flex-col w-full items-center justify-center leading-tight'>
          <h1 className='text-zinc-900 text-4xl'>
            Girêh
          </h1>
          <p className='text-xs font-jakart tracking-[.25em] text-center'>EYEWEAR</p>
        </div>

        <div className='w-full flex flex-col gap-2 items-center justify-center'>

          <Link className='w-full max-w-[620px]' href='/catalog'>
            <Button
              variant='secondary'
              className='w-full justify-between py-4'
            >
              Catálogo
              <ChevronRight
                size={24}
                className='stroke-zinc-950'
                strokeWidth={2}
              />
            </Button>
          </Link>

          {/* <Link href='/catalog'>
            <button className='flex flex-row justify-center gap-1 items-center border-b border-zinc-300 pb-0.5'>
              <p className='text-sm text-zinc-700'>
                Continuar sem conta
              </p>
              <ArrowRightCircle
                size={18}
                className='stroke-zinc-500'
                strokeWidth={2}
              />
            </button>
          </Link> */}
        </div>

      </motion.div>
    </AnimatePresence>
  )
}

interface TextsProps {
  text: string;
  current: boolean;
  SVG: ReactNode;
}

function Text({ text, current, SVG }: TextsProps) {
  return (
    <AnimatePresence
      mode='popLayout'
    >
      {current && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='flex flex-col items-center justify-between w-full p-4'
        >
          {SVG}
          <p
            className='text-zinc-900 text-lg font-jakarta'
          >
            {text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
