import { Button } from '@/components/buttons/button'
import { ChevronRight } from 'lucide-react'
import React from 'react'

export function IndexScreen() {
    return (
        <div className='w-full h-screen flex items-center justify-center fixed'>
            <Button variant='secondary' className='w-full justify-between py-4'>
                Catalogo
                <ChevronRight
                    size={24}
                    className='stroke-zinc-950'
                    strokeWidth={2}
                />
            </Button>
        </div>
    )
}
