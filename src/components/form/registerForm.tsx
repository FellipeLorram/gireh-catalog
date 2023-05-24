import React from 'react';
import { Input } from '../form/controllers/input';
import { Button } from '../buttons/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const RegisterFormSchema = z.object({
    name: z.string().min(3, 'Nome inválido'),
    phone: z.string().min(11, 'Telefone inválido'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    passwordConfirmation: z.string().min(6, 'Senha inválida'),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
});

export type RegisterFormFields = z.infer<typeof RegisterFormSchema>;

interface Props {
    onSubmit: (data: RegisterFormFields) => void;
    loading?: boolean;
}

export function RegisterForm({ onSubmit, loading }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormFields>({
        resolver: zodResolver(RegisterFormSchema),
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

            <Input.Wrapper>
                <Input.Label label='Senha' />
                <Input.Input
                    {...register('password')}
                    placeholder='•••••••'
                    type='password'
                    error={errors.password?.message}
                />
                <Input.Error message={errors.password?.message} />
            </Input.Wrapper>

            <Input.Wrapper>
                <Input.Label label='Confirmar senha' />
                <Input.Input
                    {...register('passwordConfirmation')}
                    placeholder='•••••••'
                    type='password'
                    error={errors.passwordConfirmation?.message}
                />
                <Input.Error message={errors.passwordConfirmation?.message} />
            </Input.Wrapper>

            <Button loading={loading} className='w-full'>
                Criar conta
            </Button>
        </form>
    )
}
