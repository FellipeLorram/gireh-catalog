import { Product } from "./product";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    createdAt: number;
    updatedAt: number;
    cart: Product[];
    favorites: Product[];
};
