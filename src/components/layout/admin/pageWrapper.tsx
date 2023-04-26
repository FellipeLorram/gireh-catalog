import React from 'react'
import { motion } from 'framer-motion'
import { Topbar, TopbarProps } from '@/components/layout/admin/topbar'

const variants = {
    hidden: { opacity: 0, x: -500 },
    animate: { opacity: 1, x: 0 },
}

interface Props extends TopbarProps { 
    children: React.ReactNode;
}; 

export default function PageWrapper({ href, title, children }: Props) {
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
                    title={title}
                    href={href}
                />
                {children}
            </motion.div>
        </div>
    )
}
