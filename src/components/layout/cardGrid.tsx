import { Product } from '@/lib/entities/product';
import React from 'react';
import { Card } from './card';

interface Props {
  products: Product[];
}

export function CardGrid({ products }: Props) {
  return (
    <div className='grid grid-cols-2 gap-2 gap-y-4 p-2'>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  )
}
