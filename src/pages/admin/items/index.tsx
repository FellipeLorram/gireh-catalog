import React, { useEffect, useState } from 'react'
import { AddItemButton } from '@/components/buttons/AddItemButton'
import { Button } from '@/components/buttons/button'
import { Input } from '@/components/form/controllers/input'
import Products from '@/components/layout/admin/Products'
import { AuthState } from '@/lib/auth'
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from '@/lib/firebase'
import { Product } from '@/lib/entities/product'
import { ProductsAtom, ProductsCategory } from '@/context/appContext'
import { useAtom } from 'jotai'

interface Props {
    products: ProductsCategory
}

export async function getServerSideProps() {
    const q = query(collection(database, "products"));
    const femProducts: Product[] = [];
    const mascProducts: Product[] = [];
    const childProducts: Product[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        switch (data.category) {
            case 'fem':
                femProducts.push({ ...data as Product, id: doc.id });
                break;
            case 'masc':
                mascProducts.push({ ...data as Product, id: doc.id });
                break;
            case 'child':
                childProducts.push({ ...data as Product, id: doc.id });
                break;
            default:
                break;
        }
    });

    return {
        props: {
            products: {
                masc: mascProducts,
                fem: femProducts,
                child: childProducts,
            },
        }
    }
}



export default function Admin({ products }: Props) {
    const [isAddItemButtonVisible, setIsAddItemButtonVisible] = useState(true);
    const [, setProductsAtom] = useAtom(ProductsAtom);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | string | number | undefined = '';
        const handleScroll = () => {
            setIsAddItemButtonVisible(false)
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                handleScrollEnd();
            }, 500);
        };

        const handleScrollEnd = () => {
            setIsAddItemButtonVisible(true);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setProductsAtom(products);
    }, [products]);

    return (
        <AuthState>
            <main className='relative w-full h-full'>
                <div className='w-full flex justify-between items-center flex-row p-2 mb-2'>
                    <h1 className='font-jakarta'>Girêh</h1>
                    <h1 className='font-jakarta text-xs text-zinc-700'>Catálogo Admin</h1>
                </div>
                <div className='border-b border-zinc-300 w-full flex flex-row items-center justify-center p-2 gap-1 mb-2'>
                    <Input.Wrapper>
                        <Input.Input className='text-sm' placeholder='Pesquisar...' />
                    </Input.Wrapper>
                    <Button className='text-sm self-stretch'>
                        Buscar
                    </Button>
                </div>

                <Products />

                <div className='w-full fixed bottom-2 items-center flex justify-center'>
                    <AddItemButton isVisible={isAddItemButtonVisible} />
                </div>
            </main>
        </AuthState>
    )
}
