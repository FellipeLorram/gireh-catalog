import { Product } from '@/lib/entities/product';
import React from 'react';
import { Card } from './card';

interface Props {
  products: Product[];
}

export function CardGrid({ products }: Props) {
  return (
    <div className='grid grid-cols-2 gap-3 gap-y-6 p-2'>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  )
}
