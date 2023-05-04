import { ItemPreviewOpenAtom } from '@/context/appContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React, { useState } from 'react'

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


const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


export default function ItemPreview() {
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
                    className='pt-36 z-50 fixed backdrop-blur-sm w-screen h-screen bg-zinc-700/60 flex flex-center items-center justify-center'
                >
                    <motion.div
                        variants={ModalVariants}
                        initial='hidden'
                        animate='animate'
                        exit='exit'
                        transition={{
                            duration: 0.2,

                        }}
                        drag="y"
                        dragElastic={0.3}
                        dragConstraints={{ top: 0, bottom: 50 }}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.y, velocity.y);
                            if (swipe > swipeConfidenceThreshold) {
                                setOpen(false);
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className='w-full max-w-[840px] h-full rounded-t bg-white-100 px-4 pb-8 relative'
                    >
                        <div className='p-2 items-center justify-center flex w-full flex-col gap-2 '>
                            <div className='h-1.5 bg-zinc-400/70 w-28 rounded-lg' />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
