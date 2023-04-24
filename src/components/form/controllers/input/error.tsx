import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export function Error({ message, className, ...props }: Props) {
    return (
        <>
            {message && <p {...props} className='text-red-400 text-sm'>{message}</p>}
        </>
    )
}
