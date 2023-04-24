export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    reference: string;
    brand: string;
    material: string;
    price: number;
    isAvailable: 'available' | 'unavailable';
    images: string[];
    internalDescription?: string;
    supplier: string;
    measurements: {
        horizontal: number;
        vertical: number;
        bridge: number;
    };
}