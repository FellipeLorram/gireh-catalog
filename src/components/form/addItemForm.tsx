import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './controllers/input';
import { Button } from '../buttons/button';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { database, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const addItemFormSchema = z.object({
    name: z.string().nonempty('Nome inválido'),
    price: z.string().transform((value) => Number(value)),
    description: z.string().nonempty('Descrição inválida'),
    images: z.array(z.instanceof(File)),
    category: z.string().nonempty('Categoria inválida'),
    brand: z.string().nonempty('Marca inválida'),
    material: z.string().nonempty('Material inválido'),
    isAvailable: z.string().default('available'),
    reference: z.string().nonempty('Referencia inválida'),
    bridge: z.string().nonempty('Ponte inválida'),
    horizontal: z.string().nonempty('Horizontal inválida'),
    vertical: z.string().nonempty('Vertical inválida'),
    internalDescription: z.string().nullable(),
    supplier: z.string().nonempty('Fornecedor inválido'),
});

type FormFields = z.infer<typeof addItemFormSchema>;

export function AddItemForm() {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(addItemFormSchema)
    });

    function setImagesValues(images: File[]) {
        setValue('images', images);
    }

    async function onSubmit({ images, ...data }: FormFields) {
        const docRef = await addDoc(collection(database, 'products'), {
            ...data,
            createdAt: new Date().getTime(),
        });

        const imagesDownloadURL: string[] = [];

        const storageRef = ref(storage, `products/frames/${docRef.id}`);

        const imageRefs = images.map((image) => {
            return ref(storageRef, `/${image.name}`);
        });


        const uploadPromises = images.map(async (image, index) => {
            const uploadResult = await uploadBytes(imageRefs[index], image);
            const downloadURL = await getDownloadURL(uploadResult.ref);
            return downloadURL;
        });

        imagesDownloadURL.push(...await Promise.all(uploadPromises));

        await updateDoc(docRef, { images: imagesDownloadURL });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex items-start justify-center flex-col gap-4 p-4'
        >
            <Input.Wrapper>
                <Input.Label label='Imagens' />
                <Input.File
                    accept="image/x-png,image/gif,image/jpeg"
                    {...register('images')}
                    setValue={setImagesValues}
                    multiple
                    error={errors.images?.message as string}
                />
                <Input.Error message={errors.images?.message as string} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Nome'>
                    <Input.Input
                        {...register('name')}
                        type='text'
                        error={errors.name?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.name?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Descrição'>
                    <Input.TextArea
                        {...register('description')}
                        error={errors.description?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.description?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Categoria'>
                    <Input.Select
                        {...register('category')}
                        options={[
                            { label: 'Feminino', value: 'fem' },
                            { label: 'Masculino', value: 'masc' },
                        ]}
                    />
                </Input.Label>

                <Input.Error message={errors.category?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Referência'>
                    <Input.Input
                        {...register('reference')}
                        error={errors.reference?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.reference?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Marca'>
                    <Input.Input
                        {...register('brand')}
                        error={errors.brand?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.brand?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Material'>
                    <Input.Input
                        {...register('material')}
                        error={errors.material?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.material?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Preço'>
                    <Input.Input
                        type='number'
                        {...register('price')}
                        error={errors.price?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.price?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Disponibilidade'>
                    <Input.Select
                        {...register('isAvailable')}
                        options={[
                            { label: 'Disonível', value: 'available' },
                            { label: 'Não Disponível', value: 'unavailable' },
                        ]}
                        error={errors.isAvailable?.message}

                    />
                </Input.Label>
                <Input.Error message={errors.isAvailable?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Horizontal'>
                    <Input.Input
                        type='number'
                        {...register('horizontal')}
                        error={errors.horizontal?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.horizontal?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Vertical'>
                    <Input.Input
                        type='number'
                        {...register('vertical')}
                        error={errors.vertical?.message}
                    />
                </Input.Label>
                <Input.Error message={errors.vertical?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Ponte'>
                    <Input.Input
                        type='number'
                        {...register('bridge')}
                        error={errors.bridge?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.bridge?.message} />
            </Input.Wrapper>

            <div className='w-full flex items-center justify-center gap-4 flex-row'>
                <div className='w-1/3 h-0.5 bg-zinc-300' />
                <div className='w-full'>
                    <p className='text-md text-zinc-600'>Informações internas</p>
                </div>
                <div className='w-1/3 h-0.5 bg-zinc-300' />
            </div>

            <Input.Wrapper>
                <Input.Label label='Descrição'>
                    <Input.TextArea
                        {...register('internalDescription')}
                        error={errors.supplier?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.supplier?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Fornecedor'>
                    <Input.Input
                        type='text'
                        {...register('supplier')}
                        error={errors.supplier?.message}
                    />
                </Input.Label>

                <Input.Error message={errors.supplier?.message} />
            </Input.Wrapper>

            <Button className='w-full'>
                Adicionar
            </Button>
        </form>
    )
}
