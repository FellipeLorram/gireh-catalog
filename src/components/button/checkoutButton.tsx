import React from 'react';
import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { CartOpenAtom } from '@/context/appContext'

const variants = {
    hidden: {
        opacity: 0,
        y: 100,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
}

export function CheckoutButton() {
    const [open] = useAtom(CartOpenAtom);
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    variants={variants}
                    initial='hidden'
                    animate='animate'
                    exit='hidden'
                    className='w-full items-center justify-center flex fixed bottom-2'
                >
                    <button className='p-2 px-4 bg-zinc-800 text-md w-fit text-white-200 rounded-3xl flex items-center justify-center gap-2'>
                        <CheckCircle2 strokeWidth={1} size={18} className='stroke-white-200' />
                        Solicitar Atendimento
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
