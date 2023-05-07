import React from 'react';
import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { CartAtom, CartOpenAtom } from '@/context/appContext'

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
    const [cart] = useAtom(CartAtom);

    return (
        <AnimatePresence>
            {cart.length > 0 && open && (
                <motion.div
                    variants={variants}
                    initial='hidden'
                    animate='animate'
                    exit='hidden'
                    className='w-full items-center justify-center flex fixed bottom-2 -z-50'
                >
                    <button className='p-2 px-4 bg-zinc-950 text-md w-fit text-white-100 rounded-3xl flex items-center justify-center gap-2'>
                        <CheckCircle2 strokeWidth={1} size={18} className='stroke-white-100' />
                        Solicitar Atendimento
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
