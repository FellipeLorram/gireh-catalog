import { Product } from '@/lib/entities/product';
import { atom } from 'jotai';

export type UserLocation = 'Tudo' | 'Feminino' | 'Masculino' | 'Infantil';

export const userLocationAtom = atom<UserLocation>('Tudo');

export const FavoritesOpenAtom = atom<Boolean>(false);
export const CartOpenAtom = atom<Boolean>(false);
export const CartAtom = atom<Product[]>([]);
export const FavoritesAtom = atom<Product[]>([]);

export interface ProductsCategory {
    masc: Product[];
    fem: Product[];
    child: Product[];
}

export const ProductsAtom = atom<ProductsCategory>({
    masc: [],
    fem: [],
    child: [],
});
