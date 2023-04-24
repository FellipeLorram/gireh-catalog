import React, { forwardRef, useCallback, useRef, useState } from 'react'
import { FileMinus2 } from 'lucide-react';
import { Button } from '@/components/buttons/button';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    setValue: (values: File[]) => void;
}

export const InputFileComponent = forwardRef<HTMLInputElement, Props>(({
    error,
    className,
    setValue,
    onChange,
    ...props
},
    ref) => {
    const [fileNames, setFileNames] = useState<string[] | null>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    function onChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFileNames(files.map((file) => file.name));
            setValue(files);
        }
    }

    const handleButtonClick = useCallback(() => {
        labelRef.current?.click();
    }, []);

    const handleRemoveFile = useCallback((fileName: string) => {
        setFileNames((prev) => prev?.filter((file) => file !== fileName) || null);
    }, []);

    return (
        <div
            className={`duration-150
        ease-in-out w-full border-2
        rounded-md text-white p-2 
        flex flex-col items-center justify-between
        gap-2
        ${className}
        ${error ? 'border-red-400' : 'border-zinc-400'}`}
        >
            <label ref={labelRef} className=' w-full flex items-center justify-between'>
                <input
                    onChange={onChangeHandle}
                    className='hidden'
                    {...props}
                    type='file'
                    ref={ref}
                />

                <Button onClick={handleButtonClick} type='button' className='w-full'>
                    Selecionar imagens
                </Button>
            </label>

            {fileNames && (
                <div className='flex w-full flex-col items-center justify-center gap-1.5 py-1.5'>
                    {fileNames?.map((fileName) => (
                        <div key={fileName} className='w-full flex flex-row items-center justify-between border border-zinc-500 rounded p-1.5'>
                            <p className='text-md text-zinc-900 '>{fileName}</p>
                            <FileMinus2 onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(fileName)
                            }} size={18} strokeWidth={1} className='stroke-zinc-900' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
});

InputFileComponent.displayName = "Input";
