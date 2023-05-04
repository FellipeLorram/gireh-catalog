import React, { SetStateAction, useState } from 'react'
import Image from 'next/image';
import { Product } from '@/lib/entities/product';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CartAtom, FavoritesAtom, ItemPreviewOpenAtom } from '@/context/appContext';
import { useAtom, } from 'jotai';
import { CartPlus } from '@/components/icons/cartPlus';
import ItemPreview from '../itemPreview';

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
    const [imagesCard] = useState(images.slice(0, 2));
    const [imageIndicator, setImageIndicator] = useState(0);
    const [itemPreviewOpen, setItemPreviewOpen] = useAtom(ItemPreviewOpenAtom);

    const [favorites, setFavorites] = useAtom(FavoritesAtom);
    const [cartItems, setCartItems] = useAtom(CartAtom);


    const paginate = (newDirection: number) => {
        setImageTranslationX(newDirection);
    };

    const isFavorite = favorites.findIndex((product) => product.id === id) !== -1;
    const isInCart = cartItems.findIndex((product) => product.id === id) !== -1;

    function handleFavoritesIconClick() {
        setFavorites((prev) => {
            const index = prev.findIndex((product) => product.id === id);
            if (index === -1) {
                return [...prev, { name, images, description, id, ...props }];
            } else {
                return prev.filter((_, i) => i !== index);
            }
        })
    }

    return (
        <div className='w-full flex flex-col items-start overflow-hidden gap-1'>
            <div className='w-full'>
                <motion.div
                    className='w-full relative'
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
                            setImageIndicator(1)
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(50);
                            setImageIndicator(0)
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

                        {imagesCard.map((src, i) => (
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

                    <div className='absolute bottom-3 w-full flex items-center justify-center gap-2 mt-2'>
                        {imagesCard.map((src, i) => (
                            <ImageIndicator
                                key={src}
                                index={i}
                                currentIndex={imageIndicator}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className='w-full flex justify-between items-center gap-2'>
                <h2 className='text-sm flex-1'>
                    {name}
                </h2>
                <Heart
                    onClick={handleFavoritesIconClick}
                    fill={`${isFavorite ? '#b91c1c' : '#FFF'}`}
                    className={`
                    duration-200 ease-in-out
                    ${isFavorite ? 'stroke-red-600' : 'stroke-zinc-900'}
                    `}
                    size={20}
                    strokeWidth={1}
                />
                <div className='relative'>
                    {isInCart && <div className='h-2 w-2 rounded-full bg-red-500 right-0 top-0 absolute z-0'></div>}
                    <CartPlus
                        className='stroke-zinc-900 z-10'
                        onClick={() => setItemPreviewOpen(true)}
                    />
                </div>
            </div>
        </div>
    )
}

function ImageIndicator({ index, currentIndex }: { index: number, currentIndex: number }) {
    return (
        <div className={`${index === currentIndex ? 'w-2 h-2' : 'w-1 h-1'} rounded-full border border-zinc-700 duration-100 ease-in-out shadow-lg shadow-black`}>
            <div
                className={`w-full h-full rounded-full duration-100 ease-in-out
            ${index === currentIndex ? 'bg-zinc-800 border border-zinc-200' : 'bg-transparent'}`}
            />
        </div>
    )
}
