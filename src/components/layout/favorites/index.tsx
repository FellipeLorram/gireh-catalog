import React from 'react'
import { FavoritesAndCartLayoutWrapper } from '../cartAndFavoritesWrapper'
import { FavoritesOpenAtom } from '@/context/appContext'
import { Heart } from 'lucide-react'

export function Favorites() {

    return (
        <FavoritesAndCartLayoutWrapper
            OpenAtom={FavoritesOpenAtom}
        >
            <div className='flex w-full flex-row gap-2 items-center justify-start mt-8 pb-2 border-b border-zinc-200'>
                <Heart strokeWidth={1} size={18} className='stroke-zinc-600'/>
                <h1 className='text-zinc-600'>Favoritos</h1>
            </div>
        </FavoritesAndCartLayoutWrapper>
    )
}
