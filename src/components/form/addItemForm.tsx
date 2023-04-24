import React from 'react';
import { array, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './controllers/input';
import { Button } from '../buttons/button';

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

    async function onSubmit({ images }: FormFields) {
        console.log(images)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex items-start justify-center flex-col gap-4 p-4'
        >
            <Input.Wrapper>
                <Input.Label label='Imagens' />
                <Input.File
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
                <Input.Label label='Categoria'>
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

            <Button className='w-full'>
                Adicionar
            </Button>
        </form>
    )
}
