import { Loader2 } from 'lucide-react';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, className, loading, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={`flex items-center justify-center gap-2 p-2 px-4
        rounded-md text-md font-medium border 
       ${variant === 'secondary' ? 'bg-white-100 text-zinc-950 border-zinc-950' : 'text-white-100 bg-zinc-950 border-transparent'} 
       ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 strokeWidth={1} className='stroke-zinc-300 animate-spin' />
      ) : children}
    </button>
  )
}
