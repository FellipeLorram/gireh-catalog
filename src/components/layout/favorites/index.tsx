import React, { useEffect } from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { FavoritesAndCartLayoutWrapper } from '../cartAndFavoritesWrapper'
import { FavoritesAtom, FavoritesOpenAtom } from '@/context/appContext'
import { FavoritesItem } from './favoritesItem'

export function Favorites() {
    const [favorites, setFavorites] = useAtom(FavoritesAtom);
    const [unFavoritesIds, setUnFavoritesIds] = React.useState<string[]>([]);
    const [FavoritesOpen] = useAtom(FavoritesOpenAtom);

    useEffect(() => {
        if (!FavoritesOpen) {
            if (unFavoritesIds.length > 0) {
                setFavorites((prev) =>
                    prev.filter((item) => !unFavoritesIds.includes(item.id))
                );
                setUnFavoritesIds([]);
            }
        }
    }, [FavoritesOpen]);

    return (
        <FavoritesAndCartLayoutWrapper
            OpenAtom={FavoritesOpenAtom}
        >
            <div className='flex w-full flex-row gap-2 items-center justify-start mt-8 pb-2 border-b border-zinc-200'>
                <Heart strokeWidth={1} size={18} className='stroke-zinc-600' />
                <h1 className='text-zinc-600 flex-1'>Favoritos</h1>
                {favorites.length > 0 && (
                    <p className='text-zinc-600'>
                        {favorites.length}
                    </p>
                )}
            </div>

            {favorites.length > 0 ? (
                <div className='flex w-full flex-col items-center justify-center gap-4 mt-4'>
                    {favorites.map((product) => (
                        <FavoritesItem
                            setUnFavoritesIds={setUnFavoritesIds}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <EmptyFavorites />
            )}
        </FavoritesAndCartLayoutWrapper>
    )
}


function EmptyFavorites() {
    return (

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
    )
}
