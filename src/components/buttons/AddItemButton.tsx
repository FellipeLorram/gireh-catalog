import React from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link';

const variants = {
    hidden: {
        y: 100,
    },
    animate: {
        y: 0,
    },
}

interface Props {
    isVisible: boolean;
}

export function AddItemButton({ isVisible }: Props) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={variants}
                    initial='hidden'
                    animate='animate'
                    exit='hidden'
                    className='w-full items-center justify-center flex fixed bottom-2'
                >
                    <Link href='/admin/add-item'>
                        <button className='p-2 px-4 bg-zinc-950 text-md w-fit text-white-100 rounded-3xl flex items-center justify-center gap-2'>
                            <PlusCircle strokeWidth={1} size={20} className='stroke-white-100' />
                            Adicionar Item
                        </button>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
