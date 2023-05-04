import React from 'react'

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full flex items-center justify-center relative'>
            <main className='w-full max-w-[840px]'>
                {children}
            </main>
        </div>
    )
}
