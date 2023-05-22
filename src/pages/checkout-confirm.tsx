import React from 'react';
import { Wrapper } from '@/components/layout/wrapper';
import { motion } from 'framer-motion';

import CheckoutScreenConfirm from '@/components/svg/CheckoutConfirmAnimate';
import { Button } from '@/components/buttons/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const variants = {
    hidden: {
        opacity: 0,
        y: 100,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

export default function CheckoutConfirm() {
    return (
        <Wrapper>
            <motion.div
                variants={variants}
                initial='hidden'
                animate='animate'
                exit='hidden'
                className='w-full items-center justify-start flex flex-col p-4 text-center h-screen gap-4'
            >
                <div
                    className='flex flex-col w-full items-center justify-center h-full gap-4'
                >
                    <CheckoutScreenConfirm
                        className='w-4/5'
                    />
                    <p className='text-lg'>
                        Obrigado! <br />
                        Em breve entraremos em contato.
                    </p>
                </div>
                <Link className='w-full' href='/catalog'>
                    <Button variant='secondary' className='w-full justify-between py-4'>
                        Catalogo
                        <ChevronRight
                            size={24}
                            className='stroke-zinc-950'
                            strokeWidth={2}
                        />
                    </Button>
                </Link>
            </motion.div>
        </Wrapper>
    )
}
