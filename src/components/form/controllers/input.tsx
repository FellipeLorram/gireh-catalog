import React, { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

interface WrapperProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

interface LabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
    label: string;
}

interface ErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

function Wrapper({ children, className, ...props }: WrapperProps) {
    return (
        <label {...props} className={`w-full max-w-[640px] flex flex-col items-start justify-center gap-1 ${className}`}>
            {children}
        </label>
    )
}

const InputComponent = forwardRef<HTMLInputElement, Props>(({ error, className, ...props }, ref) => {
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

function Label({ label, className, ...props }: LabelProps) {
    return (
        <p {...props} className={`text-zinc-800 mb-1 font-medium  ${className}`}>{label}</p>
    )
}

function Error({ message, className, ...props }: ErrorProps) {
    return (
        <>
            {message && <p {...props} className='text-red-400 text-sm'>{message}</p>}
        </>
    )
}


InputComponent.displayName = "Input";

const Input = {
    Wrapper,
    Label,
    Error,
    Input: InputComponent
}

export { Input }