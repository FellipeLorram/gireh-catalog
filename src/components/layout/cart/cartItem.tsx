import React, { useState } from 'react'
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/entities/product'

interface Props {
    product: Product;
}

export function CartItem({
    product: {
        id,
        images,
        description,
        name,
        ...props
    } }: Props) {
    const [isFavorite, setIsFavorite] = useState(true);

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
        
            </div>
        </div>
    )
}
