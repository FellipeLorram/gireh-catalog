import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from './controllers/input';
import { Button } from '../buttons/button';
import { loginUser } from '@/lib/auth/loginUser';
import { Facebook } from 'lucide-react';

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

            <div className='w-full flex flex-rol gap-2 items-center justify-center'>
                <div
                    className='w-full h-[1px] bg-zinc-400'
                />
                ou
                <div
                    className='w-full h-[1px] bg-zinc-400'
                />
            </div>

            <Button
                variant='secondary'

                className='w-full flex flex-row items-center justify-center gap-2'
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    className="icon icon-tabler icon-tabler-brand-google"
                    viewBox="0 0 24 24"
                >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M17.788 5.108A9 9 0 1021 12h-8"></path>
                </svg>
                <p>Entrar com Google</p>
            </Button>

            <Button
                variant='secondary'

                className='w-full flex flex-row items-center justify-center gap-2'
            >
                <Facebook
                    size={20}
                    strokeWidth={1.5}
                />
                <p>Entrar com Facebook</p>
            </Button>

        </form>
    )
}
