import React from 'react'
import { motion } from 'framer-motion'

const BackDropVariants = {
    hidden: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
        transition: {
            delay: 0.2,
        }
    },
}

const ModalVariants = {
    hidden: {
        y: 600,
    },
    animate: {
        y: 0,
    },
    exit: {
        y: 600,
    },
}

export default function CheckoutConfirm() {
  return (
    <motion.div
        className='w-full flex items-center justify-center fixed h-screen blur-sm bg-zinc-700/60 z-50'
    >
        
    </motion.div>
  )
}
