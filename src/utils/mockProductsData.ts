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
        category: 'Category 1',
        material: 'Acetato',
        isAvailable: true,
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
        category: 'Category 2',
        material: 'Material 2',
        isAvailable: true,
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
        category: 'Category 3',
        material: 'Material 3',
        isAvailable: true,
    },
    {
        id: '4',
        name: 'Ray Ban',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestias obcaecati pariatur! Eligendi, totam nesciunt id possimus, fugit molestias incidunt assumenda, a quos ipsa quia! Exercitationem voluptate voluptatem illum magnam!',
        price: 400,
        images: [
            '/images/fridon_7.jpg',
            '/images/fridon_8.jpg',
        ],
        brand: 'Brand 4',
        category: 'Category 4',
        material: 'Material 4',
        isAvailable: false,
    },
]