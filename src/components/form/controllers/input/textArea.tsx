import { TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextAreaComponent = forwardRef<HTMLTextAreaElement, Props>(({ error, className, ...props }, ref) => {
    return (
        <textarea
            className={`resize-none focus:border-zinc-900 duration-150
                     ease-in-out w-full outline-none border-2
                     bg-transparent rounded-md text-white p-2 
                     ${className}
                     ${error ? 'border-red-400' : 'border-zinc-400'}`}
            {...props}
            ref={ref}
        />
    )
});

TextAreaComponent.displayName = "TextArea";
