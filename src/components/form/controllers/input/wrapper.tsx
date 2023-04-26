import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> { }

export function Wrapper({ children, className, ...props }: Props) {
    return (
        <div {...props} className={`w-full flex flex-col items-start justify-center gap-1 ${className}`}>
            {children}
        </div>
    )
}