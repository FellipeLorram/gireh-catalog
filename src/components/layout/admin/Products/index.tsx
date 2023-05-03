import React, { Dispatch, useEffect, useState } from 'react';
import { Product } from '@/lib/entities/product';
import { useAtom } from 'jotai';
import { ProductsAtom } from '@/context/appContext';
import Image from 'next/image';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';

type VisibleScreen = 'masc' | 'fem' | 'child';

type navLabelProps = {
  name: string;
  value: VisibleScreen;
};

interface NavLinkProps {
  label: navLabelProps;
  currentScreen: VisibleScreen;
  setvisibleScreen: Dispatch<React.SetStateAction<VisibleScreen>>;
};

const navLinks: navLabelProps[] = [
  {
    name: 'Masculino',
    value: 'masc',
  },
  {
    name: 'Feminino',
    value: 'fem',
  },
  {
    name: 'Infantil',
    value: 'child',
  },
];

export default function Products() {
  const [visibleScreen, setvisibleScreen] = useState<VisibleScreen>('masc');
  const [{ masc, fem, child }] = useAtom(ProductsAtom);

  return (
    <div>
      <div className='flex flex-row justify-between items-center px-1 border-b border-zinc-300 pb-2'>
        {navLinks.map((link) => (
          <NavLink
            key={link.value}
            label={link}
            currentScreen={visibleScreen}
            setvisibleScreen={setvisibleScreen}
          />
        ))}
      </div>
      <div className='p-1 mb-2'>
        {visibleScreen === 'masc' && <ProductList products={masc} />}
        {visibleScreen === 'fem' && <ProductList products={fem} />}
        {visibleScreen === 'child' && <ProductList products={child} />}
      </div>
    </div>
  )
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className='w-full flex flex-col gap-1'>
      {products.length === 0 && (
        <div className='w-full flex flex-col text-center items-center justify-center p-4 self-stretch mt-10'>
          <PackageOpen size={36} className='stroke-zinc-500 animate-pulse' strokeWidth={1} />
          <p className='text-zinc-500'>
            Ainda não possuem produtos cadastrados nessa categoria
          </p>
        </div>
      )}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductItem({ product }: { product: Product }) {
  return (
    <Link href={`/admin/items/${product.id}`}>
      <div className='w-full flex flex-row items-start justify-center gap-2 border border-zinc-300 rounded'>
        <div className='w-1/4 flex flex-col items-center justify-center p-1'>
          <Image height={3024} width={3024} src={product.images[0]} alt={product.name} className='w-full' />
        </div>
        <div className='w-3/4 flex flex-col items-start justify-center p-2'>
          <p className='text-zinc-800 font-medium text-md'>{product.name}</p>
          <p className='text-zinc-600 text-sm'>{product.description}</p>
        </div>
      </div>
    </Link>
  )
}

function NavLink({ label, currentScreen, setvisibleScreen }: NavLinkProps) {
  function handleClick() {
    setvisibleScreen(label.value);
  }

  return (
    <button onClick={handleClick} className={`rounded text-zinc-800 
      flex flex-row items-center justify-center 
      text-sm w-full p-1 ${currentScreen === label.value && 'bg-zinc-500/10 font-medium'} 
      ease-in-out duration-300
      cursor-pointer`}>
      <p>
        {label.name}
      </p>
    </button>
  );
}
