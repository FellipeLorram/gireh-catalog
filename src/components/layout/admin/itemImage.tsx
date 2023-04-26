import React, { Dispatch, useState } from 'react'
import Image from 'next/image';
import { Loader2, XCircleIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/buttons/button';
import { motion } from 'framer-motion';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';

interface Props {
    image: string;
    itemId: string;
    setImagesArray: Dispatch<React.SetStateAction<string[]>>;
}

export function ItemImage({ image, itemId, setImagesArray }: Props) {
    const [removeImagePopup, setRemoveImagePopup] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRemoveImage(image: string) {
        setLoading(true);
        const docRef = doc(database, 'products', itemId as string)
        await updateDoc(docRef, {
            images: arrayRemove(image)
        });
        setImagesArray((prev) => prev.filter((img) => img !== image));
        setLoading(false);
        setRemoveImagePopup(false);
    }

    return (
        <div key={image} className='relative'>
            <Image
                className='border border-zinc-300 w-full'
                alt={image}
                src={image}
                width={200}
                height={200}
            />
            <XCircleIcon
                onClick={() => setRemoveImagePopup(true)}
                className='stroke-zinc-950 absolute -top-2 -right-2 cursor-pointer' strokeWidth={1}
            />
            <AnimatePresence>
                {removeImagePopup && (
                    <motion.div
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
                        }}
                        className='flex flex-col items-center absolute -top-2 -right-2 p-2 bg-white-100 border border-zinc-900 rounded-lg gap-2'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <p>Excluir imagem?</p>

                        {loading ? (
                            <div className='w-full p-4 items-center flex justify-center'>
                                <Loader2 strokeWidth={1} size={24} className='stroke-zinc-600 animate-spin' />
                            </div>
                        ) : (
                            <>
                                <div className='w-full flex flex-row gap-2 text-sm'>
                                    <Button
                                        className='text-sm'
                                        onClick={() => setRemoveImagePopup(false)}
                                    >
                                        Não
                                    </Button>
                                    <Button
                                        onClick={() => handleRemoveImage(image)}
                                        variant='secondary'
                                        className='text-sm'
                                    >
                                        Sim
                                    </Button>
                                </div>
                            </>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
