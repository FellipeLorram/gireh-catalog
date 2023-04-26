import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import { AddItemForm, AddItemFormFields } from '@/components/form/addItemForm';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { database, storage } from '@/lib/firebase';
import { AuthState } from '@/lib/auth';
import { useRouter } from 'next/router';
import { Topbar } from '@/components/layout/admin/topbar';

const AddItemFormClientOnly = dynamic(
    () => import('@/components/form/addItemForm').then((mod) => mod.AddItemForm),
    { ssr: false }
);

const variants = {
    hidden: { opacity: 0, x: -500 },
    animate: { opacity: 1, x: 0 },

}

export default function AddItem() {
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit({ images, ...data }: AddItemFormFields) {
        if (loading) return;

        setLoading(true)
        const docRef = await addDoc(collection(database, 'products'), {
            ...data,
            measurements: {
                horizontal: data.horizontal,
                vertical: data.vertical,
                bridge: data.bridge,
            },
            createdAt: new Date().getTime(),
        });

        const imagesDownloadURL: string[] = [];

        const storageRef = ref(storage, `products/frames/${docRef.id}`);

        const imageRefs = images.map((image) => {
            return ref(storageRef, `/${image.name}`);
        });


        const uploadPromises = images.map(async (image, index) => {
            const uploadResult = await uploadBytes(imageRefs[index], image);
            const downloadURL = await getDownloadURL(uploadResult.ref);
            return downloadURL;
        });

        imagesDownloadURL.push(...await Promise.all(uploadPromises));

        await updateDoc(docRef, { images: imagesDownloadURL });
        setLoading(false);
        push(`/admin/items/${docRef.id}`);
    }

    return (
        <AuthState>
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
                        title='Adicionar armação'
                        href='/admin/items'
                    />
                    <AddItemFormClientOnly
                        onSubmit={onSubmit}
                        isLoading={loading}

                    />
                </motion.div>
            </div>
        </AuthState>
    )
}
