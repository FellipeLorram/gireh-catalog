import React, { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const InputComponent = forwardRef<HTMLInputElement, Props>(({ error, className, ...props }, ref) => {
    return (
        <input
            className={`focus:border-zinc-900 duration-150
                     ease-in-out w-full outline-none border-2
                     bg-transparent rounded-md text-white p-2 
                     ${className}
                     ${error ? 'border-red-400' : 'border-zinc-400'}`}
            {...props}
            ref={ref}
        />
    )
});

InputComponent.displayName = "Input";
