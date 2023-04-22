import React from 'react';
import { motion } from 'framer-motion';

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
            className='w-full h-screen bg-red-900'
        >

        </motion.div>
    )
}
