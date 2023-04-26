import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeftCircle, PackageOpen } from 'lucide-react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AddItemFormFields } from '@/components/form/addItemForm';
import { database, storage } from '@/lib/firebase';
import { ItemImage } from '@/components/layout/admin/itemImage';
import { Topbar } from '@/components/layout/admin/topbar';

const AddItemFormClientOnly = dynamic(
    () => import('@/components/form/addItemForm').then((mod) => mod.AddItemForm),
    { ssr: false }
);

const variants = {
    hidden: { opacity: 0, x: -500 },
    animate: { opacity: 1, x: 0 },

}

export default function EditItem() {
    const { push, query } = useRouter();
    const { itemId } = query;

    const [item, setItem] = useState<AddItemFormFields>();
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!itemId) return;
        setLoading(true);
        (async () => {
            const docRef = doc(database, 'products', itemId as string)
            const document = await getDoc(docRef);

            if (!document.exists()) return;

            const data = document.data();

            if (!data) return;

            setItem({
                ...data as AddItemFormFields,
                images: [],
            });
            setImages(data.images as string[]);
            setLoading(false);
        })();
    }, [itemId]);

    async function onSubmit({ images, ...data }: AddItemFormFields) {
        if (loading) return;

        setLoading(true)
        const docRef = doc(database, 'products', itemId as string)
        const storageRef = ref(storage, `products/frames/${itemId}`);

        const imagesDownloadURL: string[] = [];

        const imageRefs = images.map((image) => {
            return ref(storageRef, `/${image.name}`);
        });

        const uploadPromises = images.map(async (image, index) => {
            const uploadResult = await uploadBytes(imageRefs[index], image);
            const downloadURL = await getDownloadURL(uploadResult.ref);
            return downloadURL;
        });

        imagesDownloadURL.push(...await Promise.all(uploadPromises));

        await updateDoc(docRef, {
            ...data,
            images: arrayUnion(...imagesDownloadURL)
        });
        setLoading(false);
        push(`/admin/items/${docRef.id}`);
    }

    return (
        <div className='flex items-center justify-center'>
            <motion.div
                variants={variants}
                initial='hidden'
                animate='animate'
                className='w-11/12 max-w-[840px]'
                transition={{
                    type: 'tween',
                    duration: 0.1,
                }}>
                <Topbar
                    title='Editar armação'
                    href='/admin/items'
                />

                <div className='flex flex-col w-full gap-2 p-1 py-4 border-b border-zinc-300 mb-3'>
                    <p className='text-zinc-950 text-lg'>Imagens salvas</p>

                    {images.length > 0 ? (
                        <div className='w-full grid grid-cols-2 items-center justify-start gap-3 md:grid-cols-4'>
                            {images.map((image) => (
                                <ItemImage
                                    setImagesArray={setImages}
                                    key={image}
                                    image={image}
                                    itemId={itemId as string}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='w-full row-span-2 md:row-span-4 flex flex-col gap-2 text-center items-center justify-center p-4'>
                            <PackageOpen size={36} className='stroke-zinc-500' strokeWidth={1} />
                            <p className='text-zinc-500'>
                                Esse item não possui imagens salvas.
                            </p>
                        </div>
                    )}
                </div>

                <AddItemFormClientOnly
                    onSubmit={onSubmit}
                    isLoading={loading}
                    defaultValues={item}
                />
            </motion.div>
        </div>
    )
}
