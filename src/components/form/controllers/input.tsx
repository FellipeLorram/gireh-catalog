import React, { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ error, label, className, ...props }, ref) => {
    return (
        <div className={'w-full max-w-[640px] ' + className}>
            <label>
                <p className='text-zinc-800 mb-1 font-medium'>{label}</p>
                <input
                    className={`focus:border-zinc-900 duration-150
                     ease-in-out w-full outline-none border-2
                     bg-transparent rounded-md text-white p-2 
                     ${error ? 'border-red-400' : 'border-zinc-400'}`}
                    {...props}
                    ref={ref}
                />
            </label>
            {error && (
                <p className='text-red-400 mt-1 text-sm'>
                    {error}
                </p>
            )}
        </div>
    )
})

Input.displayName = "Input";

export { Input }
