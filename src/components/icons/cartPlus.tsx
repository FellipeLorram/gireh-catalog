import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> { };

export function CartPlus({ ...props }: Props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            className='stroke-zinc-700'
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
            <path d="M15 6h6m-3 -3v6" />
        </svg>
    )
}
