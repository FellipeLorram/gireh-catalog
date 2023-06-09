import React from 'react'
import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { ItemPreviewOpenAtom, previewProduct } from '@/context/appContext';

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
            delay: 0.2,
        }
    },
}

const ModalVariants = {
    hidden: {
        y: 600,
    },
    animate: {
        y: 0,
    },
    exit: {
        y: 600,
    },
}

interface Props {
    children: React.ReactNode;
}

export default function ItemPrevieWrapper({ children }: Props) {
    const [open, setOpen] = useAtom(ItemPreviewOpenAtom)
    const [, setPreviewProduct] = useAtom(previewProduct);

    function handleCloseIconClick() {
        setPreviewProduct(null)
        setOpen(false)
    }

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
                        className='w-full max-w-[840px] h-full rounded-t bg-white-100 pb-2 relative'
                    >
                        <div className='p-2 items-end justify-center flex w-full flex-col gap-2 '>
                            <XCircle
                                strokeWidth={2}
                                size={20}
                                className='stroke-zinc-400/70'
                                onClick={handleCloseIconClick}
                            />
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
