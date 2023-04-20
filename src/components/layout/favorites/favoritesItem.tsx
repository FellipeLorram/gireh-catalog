import { FavoritesAtom } from '@/context/appContext';
import { Product } from '@/lib/entities/product'
import { useAtom } from 'jotai';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface Props {
    product: Product;
}

export function FavoritesItem({ product: {
    id,
    images,
    description,
    name,
    ...props
} }: Props) {
    const [favorites, setFavorites] = useAtom(FavoritesAtom);

    const isFavorite = favorites.findIndex((product) => product.id === id) !== -1;

    function handleHeartIconClick() {
        setFavorites((prev) => {
            const index = prev.findIndex((product) => product.id === id);
            if (index === -1) {
                return [...prev, { name, images, description, id, ...props }]
            } else {
                return prev.filter((_, i) => i !== index)
            }
        })
    }
    return (
        <div className='w-full flex flex-row gap-2 items-start justify-start'>
            <Image
                key={images[0]}
                width={3024}
                height={3024}
                src={images[0]}
                blurDataURL='/images/placeholder-card-image.png'
                placeholder='blur'
                alt={description}
                className='max-w-[100px] max-h-[100px]'
            />
            <div className='flex flex-col flex-1 items-start justify-start gap-1'>
                <h1 className='text-md font-medium'>{name}</h1>
                <p className='text-xs'>Armação em {props.material}</p>
                <p className='text-xs'>{`${description.split(' ').slice(0, 10).join(' ')}...`}</p>
            </div>
            <div className='flex flex-col'>
                <Heart
                    onClick={handleHeartIconClick}
                    fill={`${isFavorite ? '#b91c1c' : '#FFF'}`}
                    className={`
                    duration-200 ease-in-out
                    ${isFavorite ? 'stroke-red-600' : 'stroke-zinc-700'}
                    `}
                    size={20}
                    strokeWidth={1}
                />
            </div>
        </div>
    )
}
