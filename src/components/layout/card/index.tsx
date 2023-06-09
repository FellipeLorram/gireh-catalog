import React, { SetStateAction, useState } from 'react'
import { Product } from '@/lib/entities/product';
import { Heart } from 'lucide-react';
import { CartAtom, FavoritesAtom, ItemPreviewOpenAtom, previewProduct } from '@/context/appContext';
import { useAtom, } from 'jotai';
import { CartPlus } from '@/components/icons/cartPlus';
import { CardImages } from './cardImages';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface CardProps {
    product: Product;
}

export function Card({ product: {
    id,
    name,
    images,
    description,
    ...props
} }: CardProps) {
    const [, setItemPreviewOpen] = useAtom(ItemPreviewOpenAtom);
    const [, setPreviewProduct] = useAtom(previewProduct)
    const [favorites, setFavorites] = useAtom(FavoritesAtom);
    const [cartItems] = useAtom(CartAtom);
    const { push } = useRouter()

    const isFavorite = favorites.findIndex((product) => product.id === id) !== -1;
    const isInCart = cartItems.findIndex((product) => product.id === id) !== -1;

    function handleCardClick() {
        push(`/product/${id}`)
    }

    function handleFavoritesIconClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        e.stopPropagation();

        setFavorites((prev) => {
            const index = prev.findIndex((product) => product.id === id);
            if (index === -1) {
                return [...prev, { name, images, description, id, ...props }];
            } else {
                return prev.filter((_, i) => i !== index);
            }
        })
    }

    function handleCartIconClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        e.stopPropagation();
        setItemPreviewOpen(true)
        setPreviewProduct({ name, images, description, id, ...props })
    }

    return (
        <div onClick={handleCardClick} className='w-full flex flex-col items-start overflow-hidden gap-1'>
            {images.length > 1 ? (
                <CardImages
                    productId={id}
                    images={[
                        { src: images[0], alt: description },
                        { src: images[1], alt: description },
                    ]}
                />
            ) : (
                <Image
                    src={images[0]}
                    alt={description}
                    width={3024}
                    height={3024}
                    priority
                    blurDataURL='/images/placeholder-card-image.png'
                    placeholder='blur'
                />
            )}

            <div className='w-full flex justify-between items-center gap-2'>
                <h2 className='text-sm flex-1'>
                    {name}
                </h2>
                <Heart
                    onClick={e => handleFavoritesIconClick(e)}
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
                        onClick={e => handleCartIconClick(e)}
                    />
                </div>
            </div>
        </div>
    )
}
