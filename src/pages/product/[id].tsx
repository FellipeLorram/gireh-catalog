import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

import { ItemImages } from '@/components/layout/itemPreview/itemImages'
import { Loading } from '@/components/layout/loading';
import { Wrapper } from '@/components/layout/wrapper';
import { Product } from '@/lib/entities/product';
import { database } from '@/lib/firebase';
import { AddToCartFavoriteButton } from '@/components/layout/addToCartFavoriteButton';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

const variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

export default function Product() {
    const { id } = useRouter().query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        (async () => {
            const docRef = doc(database, 'products', id as string)
            const document = await getDoc(docRef);

            if (!document.exists()) return;

            const data = document.data();

            if (!data) return;

            setProduct({
                ...data as Product,
            });
            setLoading(false);
        })();
    }, [id]);


    return loading || !product ? (
        <div className='w-full flex items-center justify-center'>
            <Loading />
        </div>

    ) : (
        <Wrapper>
            <motion.div
                variants={variants}
                initial='hidden'
                animate='animate'
                exit='hidden'
                className='w-full flex flex-col min-h-screen pb-24'
            >

                <div className='p-2 fixed top-0 left-0 z-50'>
                    <Link href='/catalog'>
                        <ArrowLeftCircle
                            size={24}
                            className='stroke-zinc-950'
                            strokeWidth={1}
                        />
                    </Link>
                </div>


                <div className='w-full h-80 '>
                    <ItemImages
                        images={product.images}
                    />
                </div>
                <div className='pb-4 p-2 w-full flex gap-1 items-start justify-start flex-col px-3'>
                    <h1 className='text-2xl font-medium'>{product.name}</h1>
                    <p>
                        {product.description}
                    </p>

                </div>
            </motion.div>
            <div className='fixed bottom-0 left-0 w-full pb-2 bg-white-100'>
                <AddToCartFavoriteButton />
            </div>
        </Wrapper>
    )
}
