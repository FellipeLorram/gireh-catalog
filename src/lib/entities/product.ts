export interface Product {
    id: string;
    name: string;
    description: string;
    category: 'fem' | 'masc' | 'child'
    reference: string;
    brand: string;
    material: string;
    price: number;
    isAvailable: 'available' | 'unavailable' | 'child';
    images: string[];
    internalDescription?: string;
    supplier: string;
    measurements: {
        horizontal: number;
        vertical: number;
        bridge: number;
    };
}