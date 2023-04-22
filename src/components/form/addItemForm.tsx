import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './controllers/input';
import { Button } from '../buttons/button';
import { loginUser } from '@/lib/auth/loginUser';

const loginFormSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha inválida'),
});

type FormFields = z.infer<typeof loginFormSchema>;

export function LoginForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormFields>({
        resolver: zodResolver(loginFormSchema)
    });

    async function onSubmit({ email, password }: FormFields) {
        const user = await loginUser({ email, password });
        if (!user) {
            setError('email', { message: 'Usuário ou senha inválidos' });
            return;
        };
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex items-start justify-center flex-col gap-4 p-4'
        >
            <Input.Wrapper>
                <Input.Label label='E-mail' />
                <Input.Input
                    {...register('email')}
                    placeholder='seu@email.com'
                    type='email'
                    error={errors.email?.message}
                />
                <Input.Error message={errors.email?.message} />
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
            <Button className='w-full'>
                Entrar
            </Button>
        </form>
    )
}
