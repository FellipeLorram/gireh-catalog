import { atom } from 'jotai';

export type UserLocation = 'Tudo' | 'Feminino' | 'Masculino' | 'Infantil';

export const userLocationAtom = atom<UserLocation>('Tudo');
