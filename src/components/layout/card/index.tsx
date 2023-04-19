import React, { useState } from 'react'
import Image from 'next/image';
import { Product } from '@/lib/entities/product';
import { motion } from 'framer-motion';
import { wrap } from 'popmotion';

interface CardProps {
    product: Product;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export function Card({ product: {
    name,
    images,
    description
} }: CardProps) {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='overflow-hidden'>
                <motion.div
                    className='w-full'
                    drag="x"
                    dragElastic={0.1}
                    custom={direction}
                    dragConstraints={{ right: 0, left: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Image
                        width={3024}
                        height={3024}
                        src={images[imageIndex]}
                        blurDataURL='/images/placeholder-card-image.png'
                        placeholder='blur'
                        alt={description}
                    />
                </motion.div>
            </div>
            <h2>
                {name}
            </h2>
        </div>
    )
}
