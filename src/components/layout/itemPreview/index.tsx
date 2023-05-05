import React from 'react'
import ItemPrevieWrapper from './wrapper'
import { useAtom } from 'jotai'
import { previewProduct } from '@/context/appContext'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export function ItemPreview() {
  const [product] = useAtom(previewProduct)


  return (
    <ItemPrevieWrapper>
      {product ? (
        <div className='w-full flex flex-col'>
          <div className='grid items-start grid-rows-1 '>
            {product.images.map((image, index) => (
              <Image
                key={index}
                alt='product'
                width={3024}
                height={3024}
                src={image}
              />
            ))}
          </div>
        </div >
      ) : (

        <div className='w-full h-full flex items-center justify-center'>
          <Loader2 strokeWidth={1} className='stroke-zinc-800 animate-spin ' />
        </div>
      )}
    </ItemPrevieWrapper >
  )
}



