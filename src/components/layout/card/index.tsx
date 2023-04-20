import React, { useState } from 'react'
import Image from 'next/image';
import { Product } from '@/lib/entities/product';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface CardProps {
    product: Product;
}

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export function Card({ product: {
    name,
    images,
    description
} }: CardProps) {
    const [imageTranslationX, setImageTranslationX] = useState(49);

    const paginate = (newDirection: number) => {
        setImageTranslationX(newDirection);
    };

    return (
        <div className='w-full flex flex-col items-start overflow-hidden gap-0.5'>
            <motion.div
                className='w-full'
                drag="x"
                dragElastic={0.1}
                transition={{
                    duration: 0.2,
                }}
                dragConstraints={{ right: 0, left: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(-50);
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(50);
                    }
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div
                    className={`flex items-center justify-center 
                        flex-row ease-in-out duration-200`}
                    style={{
                        transform: `translateX(${imageTranslationX}%)`
                    }}>

                    {images.map((src, i) => (

                        <Image
                            key={src}
                            width={3024}
                            height={3024}
                            src={src}
                            blurDataURL='/images/placeholder-card-image.png'
                            placeholder='blur'
                            alt={description}

                        />
                    ))}
                </div>
            </motion.div>

            <div className='w-full flex justify-between items-center gap-2'>
                <h2 className='text-sm flex-1'>
                    {name}
                </h2>
                <Heart className='stroke-zinc-700' size={20} strokeWidth={1} />
                <svg xmlns="http://www.w3.org/2000/svg" className='stroke-zinc-700' width="20" height="20" viewBox="0 0 24 24" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                    <path d="M15 6h6m-3 -3v6" />
                </svg>
            </div>
        </div>
    )
}
