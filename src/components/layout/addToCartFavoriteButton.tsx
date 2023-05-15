import { CartAtom, FavoritesAtom, previewProduct } from '@/context/appContext';
import { useAtom } from 'jotai';
import { Heart } from 'lucide-react';
import React from 'react'
import { Button } from '../buttons/button';

export function AddToCartFavoriteButton() {
    const [product] = useAtom(previewProduct);
    const [favorites, setFavorites] = useAtom(FavoritesAtom);
    const [cartItems, setCartItems] = useAtom(CartAtom);

    const isFavorite = favorites.findIndex((p) => p.id === product?.id) !== -1;
    const isInCart = cartItems.findIndex((p) => p.id === product?.id) !== -1;

    function handleFavoritesIconClick() {
        setFavorites((prev) => {
            if (!product) return prev
            const index = prev.findIndex((p) => p.id === product.id);
            if (index === -1) {
                return [...prev, product];
            } else {
                return prev.filter((_, i) => i !== index);
            }
        })
    };

    function handleCartIconClick() {
        setCartItems((prev) => {
            if (!product) return prev
            const index = prev.findIndex((p) => p.id === product.id);
            if (index === -1) {
                return [...prev, product];
            } else {
                return prev.filter((_, i) => i !== index);
            }
        })
    };

    return (
        <div className='flex flex-row justify-between items-center px-3 gap-2 w-full'>
            <Heart
                size={40}
                strokeWidth={1}
                className={`
          duration-200 ease-in-out
          ${isFavorite ? 'stroke-red-600 fill-red-600' : 'stroke-zinc-900'}
          `}
                onClick={handleFavoritesIconClick}
            />
            <Button
                onClick={handleCartIconClick}
                className='w-full'
            >
                {isInCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
            </Button>
        </div>
    )
}
