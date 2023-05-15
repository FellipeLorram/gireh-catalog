import React, { memo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from "popmotion";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

interface Props {
    images: string[];
};

function ItemImagesMemo({ images }: Props) {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div
            className='w-full h-full relative flex items-center justify-center'
        >
            <AnimatePresence initial={false} custom={direction}>
                <ChevronLeft
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-50 stroke-zinc-400'
                    size={24}
                    strokeWidth={2}
                    onClick={() => paginate(-1)}
                    key="chevron-left"
                />
                <motion.img
                    className='absolute w-10/12 h-full object-contain'
                    key={500 + imageIndex}
                    src={images[imageIndex]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                />
                <ChevronRight
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-50 stroke-zinc-400'
                    size={24}
                    strokeWidth={2}
                    onClick={() => paginate(1)}
                    key="chevron-right"
                />

            </AnimatePresence>
        </div>
    );
}

ItemImagesMemo.displayName = 'ItemImages'

export const ItemImages = memo(ItemImagesMemo);
