import React from 'react'

export function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full flex items-center justify-center'>
            <main className='w-full max-w-[840px] relative'>
                {children}
            </main>
        </div>
    )
}
