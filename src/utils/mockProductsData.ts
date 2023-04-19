import { Product } from "@/lib/entities/product";

export const MockProductsData: Product[] = [
    {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        images: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
        ],
        brand: 'Brand 1',
        category: 'Category 1',
        material: 'Material 1',
    }
]