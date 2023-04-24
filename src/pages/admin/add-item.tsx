import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import { AddItemForm } from '@/components/form/addItemForm';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AddItemFormClientOnly = dynamic(
  () => import('@/components/form/addItemForm').then((mod) => mod.AddItemForm),
  { ssr: false }
);

const variants = {
    hidden: { opacity: 0, x: -500 },
    animate: { opacity: 1, x: 0 },

}

export default function AddItem() {
    return (
        <motion.div
            variants={variants}
            initial='hidden'
            animate='animate'
            className='w-full'
            transition={{
                type: 'tween',
                duration: 0.1,
            }}>
            <div className='w-full flex flex-row p-2 items-center'>
                <Link href='/admin'>
                    <ArrowLeftCircle size={28} className='stroke-zinc-950' strokeWidth={1} />
                </Link>
                <p className='text-center text-lg flex-1'>Adicionar armação</p>
            </div>
            <AddItemFormClientOnly />
        </motion.div>
    )
}
