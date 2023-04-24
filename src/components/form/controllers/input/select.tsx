import React, { SelectHTMLAttributes, forwardRef } from 'react'

type option = {
  value: string | number | readonly string[] | undefined;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: option[];
}

export const SelectComponent = forwardRef<HTMLSelectElement, Props>(({ options, error, className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      {...props}
      className={`resize-none focus:border-zinc-900 duration-150
    ease-in-out w-full outline-none border-2
    bg-transparent rounded-md text-white p-2 
    ${className}
    ${error ? 'border-red-400' : 'border-zinc-400'}`}>
      {options.map(({ label, value }) => (
        <option key={label} value={value}>{label}</option>
      ))}
    </select>
  )
});

SelectComponent.displayName = "Select";
