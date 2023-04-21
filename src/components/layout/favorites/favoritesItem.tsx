import { CartPlus } from '@/components/icons/cartPlus';
import { FavoritesAtom } from '@/context/appContext';
import { Product } from '@/lib/entities/product'
import { useAtom } from 'jotai';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Props {
    product: Product;
    setUnFavoritesIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FavoritesItem({
    setUnFavoritesIds,
    product: {
        id,
        images,
        description,
        name,
        ...props
    } }: Props) {
    const [isFavorite, setIsFavorite] = useState(true);

    function handleHeartIconClick() {
        if (isFavorite) {
            setUnFavoritesIds((prev) => [...prev, id]);
            setIsFavorite(false);
        } else {
            setUnFavoritesIds((prev) => prev.filter((item) => item !== id));
            setIsFavorite(true);
        }
    }

    return (
        <div className='w-full flex flex-row gap-3 items-start justify-start'>
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
            <div className='flex flex-col flex-1 items-start justify-start gap-1 pr-1'>
                <h1 className='text-md font-medium'>{name}</h1>
                <p className='text-xs text-zinc-700'>Armação em {props.material}</p>
                <p className='text-xs text-zinc-700'>{`${description.split(' ').slice(0, 10).join(' ')}...`}</p>
            </div>
            <div className='flex flex-col gap-3'>
                <Heart
                    onClick={handleHeartIconClick}
                    fill={isFavorite ? '#b91c1c' : '#fff'}
                    className={`
                    duration-200 ease-in-out
                    ${isFavorite ? 'stroke-red-600' : 'stroke-zinc-900'}
                    `}
                    size={20}
                    strokeWidth={1}
                />
            </div>
        </div>
    )
}
