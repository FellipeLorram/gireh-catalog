import React, { useState } from 'react'
import Image from 'next/image';
import { Product } from '@/lib/entities/product'
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { CartAtom } from '@/context/appContext';

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
    const [removeConfirm, setRemoveConfirm] = useState(false);
    const [, setCartItems] = useAtom(CartAtom);

    function handleRemoveConfirmClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        setCartItems((prev) => prev.filter((item) => item.id !== id));
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
                <p className='text-xs text-zinc-700'>{`${description.split(' ').slice(0, 8).join(' ')}...`}</p>
            </div>
            <div className='flex flex-col gap-3 relative'>
                <div onClick={() => setRemoveConfirm(prev => !prev)} className='p-1 border-zinc-800 rounded border flex flex-col gap-1'>
                    <p className='text-xs text-zinc-800'>Remover</p>
                    <AnimatePresence>
                        {removeConfirm && (
                            <div className='flex flex-row gap-2 text-center'>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    setRemoveConfirm(false)
                                }}>
                                    <p className='text-xs text-zinc-800'>Não</p>
                                </button>
                                <button
                                    onClick={handleRemoveConfirmClick}
                                >
                                    <p className='text-xs text-zinc-500'>Sim</p>
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
