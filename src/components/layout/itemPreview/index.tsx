import React from 'react'
import ItemPrevieWrapper from './wrapper'
import { useAtom } from 'jotai'
import { CartAtom, FavoritesAtom, previewProduct } from '@/context/appContext'
import { Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/buttons/button'
import { ItemImages } from './itemImages'

export function ItemPreview() {
  const [product] = useAtom(previewProduct)
  const [favorites, setFavorites] = useAtom(FavoritesAtom);
  const [cartItems, setCartItems] = useAtom(CartAtom);

  const isFavorite = favorites.findIndex((product) => product.id === product?.id) !== -1;
  const isInCart = cartItems.findIndex((product) => product.id === product?.id) !== -1;

  function handleFavoritesIconClick() {
    setFavorites((prev) => {
      if (!product) return prev
      const index = prev.findIndex((product) => product.id === product?.id);
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
      const index = prev.findIndex((product) => product.id === product?.id);
      if (index === -1) {
        return [...prev, product];
      } else {
        return prev.filter((_, i) => i !== index);
      }
    })
  };

  return (
    <ItemPrevieWrapper>
      {product ? (
        <div className='w-full flex flex-col h-full pb-10 gap-2'>

          <ItemImages images={product.images} />

          <div className='w-full flex flex-col px-3 gap-2 flex-1'>
            <h1 className='text-zinc-800 text-lg font-medium'>{product.name}</h1>
            <p className='text-zinc-800 text-sm'>{product.description}</p>
          </div>

          <div className='flex flex-row justify-between items-center px-3 gap-2'>
            <Heart
              size={36}
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
        </div >


      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <Loader2 strokeWidth={1} className='stroke-zinc-800 animate-spin ' />
        </div>
      )}
    </ItemPrevieWrapper >
  )
}
