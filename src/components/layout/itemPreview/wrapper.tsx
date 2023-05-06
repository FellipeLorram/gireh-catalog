import React from 'react'
import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { ItemPreviewOpenAtom } from '@/context/appContext';
import { XCircle } from 'lucide-react';

const BackDropVariants = {
    hidden: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
        transition: {
            delay: 0.1,
        }
    },
}

const ModalVariants = {
    hidden: {
        y: 300,
    },
    animate: {
        y: 0,
    },
    exit: {
        y: 300,
    },
}

interface Props {
    children: React.ReactNode;
}

export default function ItemPrevieWrapper({ children }: Props) {
    const [open, setOpen] = useAtom(ItemPreviewOpenAtom)

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    onClick={() => setOpen(false)}
                    variants={BackDropVariants}
                    initial='hidden'
                    animate='animate'
                    exit='exit'
                    className='pt-32 z-50 fixed backdrop-blur-2xs w-screen h-screen bg-zinc-700/60 flex flex-center items-center justify-center'
                >
                    <motion.div
                        variants={ModalVariants}
                        initial='hidden'
                        animate='animate'
                        exit='exit'
                        transition={{
                            duration: 0.2,

                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className='w-full max-w-[840px] h-full rounded-t bg-white-100 pb-8 relative'
                    >
                        <div className='p-2 items-end justify-center flex w-full flex-col gap-2 '>
                            <XCircle
                                strokeWidth={2}
                                className='stroke-zinc-500'
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
