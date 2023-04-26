import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface TopbarProps {
    href: string;
    title: React.ReactNode;
};

export function Topbar({ href, title }: TopbarProps) {
    return (
        <div className='w-full flex flex-row p-2 items-center'>
            <Link href={href}>
                <ArrowLeftCircle size={28} className='stroke-zinc-950' strokeWidth={1} />
            </Link>
            <p className='text-center text-lg flex-1'>{title}</p>
        </div>
    )
}
