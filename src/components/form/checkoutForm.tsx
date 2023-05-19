import React from 'react';
import { Input } from '../form/controllers/input';
import { Button } from '../buttons/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const checkoutFormSchema = z.object({
    name: z.string().min(3, 'Nome inválido'),
    phone: z.string().min(11, 'Telefone inválido'),
    email: z.string().email('E-mail inválido'),
});

export type CheckoutFormFields = z.infer<typeof checkoutFormSchema>;

interface Props {
    onSubmit: (data: CheckoutFormFields) => void;
    loading?: boolean;
}

export default function CheckoutForm({ onSubmit, loading }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormFields>({
        resolver: zodResolver(checkoutFormSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex items-start justify-center flex-col gap-4'>
            <Input.Wrapper>
                <Input.Label label='Nome' />
                <Input.Input
                    {...register('name')}
                    placeholder='Seu nome'
                    type='text'
                    error={errors.name?.message}
                />
                <Input.Error message={errors.name?.message} />
            </Input.Wrapper>
            <Input.Wrapper>
                <Input.Label label='Email' />
                <Input.Input
                    {...register('email')}
                    placeholder='seu@email.com.br'
                    type='email'
                    error={errors.email?.message}
                />
                <Input.Error message={errors.name?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='WhatsApp' />
                <Input.Input
                    {...register('phone')}
                    placeholder='(00) 00000-0000'
                    type='text'
                    error={errors.phone?.message}
                />
                <Input.Error message={errors.phone?.message} />
            </Input.Wrapper>

            <Button loading={loading} className='w-full'>
                Finalizar
            </Button>
        </form>
    )
}
