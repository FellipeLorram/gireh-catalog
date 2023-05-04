import { Product } from "@/lib/entities/product";

export const MockProductsData: Product[] = [
    {
        id: '1',
        name: 'Ana Hickmann',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestias obcaecati pariatur! Eligendi, totam nesciunt id possimus, fugit molestias incidunt assumenda, a quos ipsa quia! Exercitationem voluptate voluptatem illum magnam!',
        price: 100,
        images: [
            '/images/fridon_1.jpg',
            '/images/fridon_2.jpg',
        ],
        brand: 'Brand 1',
        category: 'fem',
        material: 'Acetato',
        isAvailable: 'available',
        reference: '123456789',
        supplier: '',
        internalDescription: '',
        measurements: {
            bridge: 20,
            horizontal: 50,
            vertical: 30,
        }
    },
    {
        id: '2',
        name: 'Dulcet',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestias obcaecati pariatur! Eligendi, totam nesciunt id possimus, fugit molestias incidunt assumenda, a quos ipsa quia! Exercitationem voluptate voluptatem illum magnam!',
        price: 200,
        images: [
            '/images/fridon_3.jpg',
            '/images/fridon_4.jpg',
        ],
        brand: 'Brand 2',
        category: 'child',
        material: 'Material 2',
        isAvailable: 'available',
        reference: '6856236',
        supplier: '',
        internalDescription: '',
        measurements: {
            bridge: 20,
            horizontal: 56,
            vertical: 45,
        }
    },
    {
        id: '3',
        name: 'Gucci',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestias obcaecati pariatur! Eligendi, totam nesciunt id possimus, fugit molestias incidunt assumenda, a quos ipsa quia! Exercitationem voluptate voluptatem illum magnam!',
        price: 300,
        images: [
            '/images/fridon_5.jpg',
            '/images/fridon_6.jpg',
        ],
        brand: 'Brand 3',
        category: 'child',
        material: 'Material 3',
        isAvailable: 'available',
        reference: '8798',
        supplier: '',
        internalDescription: '',
        measurements: {
            bridge: 20,
            horizontal: 56,
            vertical: 45,
        }
    },
    {
        id: '4',
        name: 'Ray Ban',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestias obcaecati pariatur! Eligendi, totam nesciunt id possimus, fugit molestias incidunt assumenda, a quos ipsa quia! Exercitationem voluptate voluptatem illum magnam!',
        price: 400,
        images: [
            '/images/fridon_7.jpg',
            '/images/fridon_8.jpg',
            '/images/fridon_8.jpg',
        ],
        brand: 'Brand 4',
        category: 'masc',
        material: 'Material 4',
        isAvailable: 'unavailable',
        reference: '56465',
        supplier: '',
        internalDescription: '',
        measurements: {
            bridge: 20,
            horizontal: 56,
            vertical: 45,
        }
    },
]