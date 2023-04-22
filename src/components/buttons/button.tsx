import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...props }: Props) {
  return (
    <button className={`items-center justify-center gap-2 p-2 px-4 text-white-100 rounded-md bg-zinc-950 text-md font-medium ${className}`} {...props}>
      {children}
    </button>
  )
}
