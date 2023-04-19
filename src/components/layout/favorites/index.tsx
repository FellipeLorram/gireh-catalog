import React from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { FavoritesAndCartLayoutWrapper } from '../cartAndFavoritesWrapper'
import { FavoritesOpenAtom } from '@/context/appContext'

export function Favorites() {

    return (
        <FavoritesAndCartLayoutWrapper
            OpenAtom={FavoritesOpenAtom}
        >
            <div className='flex w-full flex-row gap-2 items-center justify-start mt-8 pb-2 border-b border-zinc-200'>
                <Heart strokeWidth={1} size={18} className='stroke-zinc-600' />
                <h1 className='text-zinc-600'>Favoritos</h1>
            </div>


            <div className='flex flex-col gap-2 items-center justify-center mt-24'>
                <motion.div
                    className='animate-pulse'
                >
                    <Heart strokeWidth={1} size={32} className='stroke-zinc-400' />
                </motion.div>
                <p className='text-zinc-500'>
                    Seus favoritos apareceram aqui.
                </p>
            </div>
        </FavoritesAndCartLayoutWrapper>
    )
}
