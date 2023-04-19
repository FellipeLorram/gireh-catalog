import { atom } from 'jotai';

export type UserLocation = 'Tudo' | 'Feminino' | 'Masculino' | 'Infantil';

export const userLocationAtom = atom<UserLocation>('Tudo');

export const FavoritesOpenAtom = atom<Boolean>(false);
export const CartOpenAtom = atom<Boolean>(false);