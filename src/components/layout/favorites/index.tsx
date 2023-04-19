import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { FavoritesOpenAtom } from '@/context/appContext';

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
        y: 100,
    },
    animate: {
        y: 0,
    },
    exit: {
        y: 100,
    },
}

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


export function Favorites() {
    const [open, setOpen] = useAtom(FavoritesOpenAtom);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    onClick={() => setOpen(false)}
                    variants={BackDropVariants}
                    initial='hidden'
                    animate='animate'
                    exit='exit'
                    className='pt-2 fixed backdrop-blur-sm w-screen h-screen bg-zinc-700/60 flex flex-center items-center justify-center'
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
                            console.log(swipe)
                            console.log(swipeConfidenceThreshold)
                            if (swipe > swipeConfidenceThreshold) {
                                setOpen(false);
                            }
                        }}
                        className='w-full h-full rounded-t-3xl bg-white-100'
                    >

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
