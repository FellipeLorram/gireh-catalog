import {  LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    children?: React.ReactNode;
}


export function Label({ label, className, children, ...props }: Props) {
    return (
        <label {...props} className={`w-full flex flex-col items-start justify-center gap-1  ${className}`}>
            <p  className='text-zinc-800 mb-1 font-medium'>{label}</p>
            {children}
        </label>
    )
}
