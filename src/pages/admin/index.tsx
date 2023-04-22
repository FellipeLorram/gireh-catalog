import { AddItemButton } from '@/components/buttons/AddItemButton'
import { Button } from '@/components/buttons/button'
import { Input } from '@/components/form/controllers/input'
import { AuthState } from '@/lib/auth'
import React, { useEffect, useState } from 'react'

export default function Admin() {
    const [isAddItemButtonVisible, setIsAddItemButtonVisible] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | string | number | undefined = '';
        const handleScroll = () => {
            setIsAddItemButtonVisible(false)
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                handleScrollEnd();
            }, 500);
        };

        const handleScrollEnd = () => {
            setIsAddItemButtonVisible(true);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AuthState>
            <main className='relative w-full h-full'>
                <div className='w-full flex justify-between items-center flex-row p-2 mb-2'>
                    <h1 className='font-jakarta'>Girêh</h1>
                    <h1 className='font-jakarta text-xs text-zinc-700'>Catálogo Admin</h1>
                </div>
                <div className='border-b border-zinc-200 w-full flex flex-row items-center justify-center p-2 gap-1'>
                    <Input.Wrapper>
                        <Input.Input className='text-sm' placeholder='Pesquisar...' />
                    </Input.Wrapper>
                    <Button className='text-sm self-stretch'>
                        Buscar
                    </Button>
                </div>

                <div className='h-screen'></div>

                <div className='w-full fixed bottom-2 items-center flex justify-center'>
                        <AddItemButton isVisible={isAddItemButtonVisible} />
                  
                </div>
            </main>
        </AuthState>
    )
}
