import { Product } from '@/lib/entities/product';
import Image from 'next/image';
import React from 'react'

interface CardProps {
    product: Product;
}

export function Card({ product }: CardProps) {
    return (
        <div className='w-full flex flex-col items-center'>
            <Image
                src={product.images[0]}
                alt={product.description}
            />
            <h2>
                {product.name}
            </h2>
        </div>
    )
}
