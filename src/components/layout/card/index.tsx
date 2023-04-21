import React, { SetStateAction, useState } from 'react'
import Image from 'next/image';
import { Product } from '@/lib/entities/product';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CartAtom, FavoritesAtom } from '@/context/appContext';
import { useAtom, } from 'jotai';
import { CartPlus } from '@/components/icons/cartPlus';

interface CardProps {
    product: Product;
}

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export function Card({ product: {
    id,
    name,
    images,
    description,
    ...props
} }: CardProps) {
    const [imageTranslationX, setImageTranslationX] = useState(49.99);
    const [favorites, setFavorites] = useAtom(FavoritesAtom);
    const [cartItems, setCartItems] = useAtom(CartAtom);

    const paginate = (newDirection: number) => {
        setImageTranslationX(newDirection);
    };

    const isFavorite = favorites.findIndex((product) => product.id === id) !== -1;

    function handleIconClick(setterFunction: (args_0: SetStateAction<Product[]>) => void) {
        setterFunction((prev) => {
            const index = prev.findIndex((product) => product.id === id);
            if (index === -1) {
                return [...prev, { name, images, description, id, ...props }]
            } else {
                return prev.filter((_, i) => i !== index)
            }
        })
    }

    return (
        <div className='w-full flex flex-col items-start overflow-hidden gap-1'>
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

            <div className='w-full flex justify-between items-center gap-3'>
                <h2 className='text-sm flex-1'>
                    {name}
                </h2>
                <Heart
                    onClick={() => handleIconClick(setFavorites)}
                    fill={`${isFavorite ? '#b91c1c' : '#FFF'}`}
                    className={`
                    duration-200 ease-in-out
                    ${isFavorite ? 'stroke-red-600' : 'stroke-zinc-700'}
                    `}
                    size={20}
                    strokeWidth={1}
                />
                <CartPlus
                    onClick={() => handleIconClick(setCartItems)}
                />
            </div>
        </div>
    )
}
