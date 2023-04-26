import React, { useEffect, useState } from 'react'
import PageWrapper from '@/components/layout/admin/pageWrapper'
import { Product } from '@/lib/entities/product'
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';
import { PackageOpen } from 'lucide-react';
import Image from 'next/image';

export default function Item() {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const { itemId } = useRouter().query;

  useEffect(() => {
    if (!itemId) return;
    setLoading(true);
    (async () => {
      const docRef = doc(database, 'products', itemId as string)
      const document = await getDoc(docRef);

      if (!document.exists()) return;

      const data = document.data();

      if (!data) return;

      setProduct({
        ...data as Product,
      });
      setLoading(false);
    })();
  }, [itemId]);


  return (
    <PageWrapper
      title='Armação'
      href='/admin/items'
    >
      <div className='flex flex-col w-full gap-2 p-1 py-4 border-b border-zinc-300 mb-3'>
        <p className='text-zinc-950 text-lg'>Imagens salvas</p>

        {product?.images && product.images.length > 0 ? (
          <div className='w-full grid grid-cols-2 items-center justify-start gap-3 md:grid-cols-4'>
            {product.images.map((image) => (
              <Image
                className='border border-zinc-300 w-full'
                alt={image}
                key={image}
                src={image}
                width={200}
                height={200}
              />
            ))}
          </div>
        ) : (
          <div className='w-full row-span-2 md:row-span-4 flex flex-col gap-2 text-center items-center justify-center p-4'>
            <PackageOpen size={36} className='stroke-zinc-500' strokeWidth={1} />
            <p className='text-zinc-500'>
              Esse item não possui imagens salvas.
            </p>
          </div>
        )}
      </div>
      <div className='pb-4 w-full flex gap-1 items-start justify-start flex-col'>
        <h1 className='text-zinc-900'>Descrição</h1>
        <p className='text-zinc-500'>{product?.description}</p>

        <h1 className='text-zinc-900 mt-3'>Preço</h1>
        <p className='text-zinc-500'>{product?.price}</p>

        <h1 className='text-zinc-900 mt-3'>Referência</h1>
        <p className='text-zinc-500'>{product?.reference}</p>

        <h1 className='text-zinc-900 mt-3'>Categoria</h1>
        <p className='text-zinc-500'>{product?.category === 'fem' ? 'Feminino' : 'Masculino'}</p>

        <h1 className='text-zinc-900 mt-3'>Material</h1>
        <p className='text-zinc-500'>{product?.material}</p>

        <h1 className='text-zinc-900 mt-3'>Marca</h1>
        <p className='text-zinc-500'>{product?.brand}</p>


        <h1 className='text-zinc-900 mt-3'>Medidas</h1>
        <p className='text-zinc-500'>{product?.measurements?.horizontal} x {product?.measurements?.vertical} x {product?.measurements?.bridge}</p>

        <h1 className='text-zinc-900 mt-3'>Disponibilidade</h1>
        <p className='text-zinc-500'>{product?.isAvailable === 'available' ? 'Disponível' : 'Indisponível'}</p>

        <h1 className='text-zinc-900 mt-3'>Fornecedor</h1>
        <p className='text-zinc-500'>{product?.supplier}</p>


        <h1 className='text-zinc-900 mt-3'>Descrição interna</h1>
        <p className='text-zinc-500'>{product?.internalDescription}</p>
      </div>
    </PageWrapper>
  )
}
