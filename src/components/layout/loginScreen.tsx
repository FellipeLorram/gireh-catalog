import React from 'react'
import { LoginForm } from '../form/loginForm'
import Logo from './logo'

export function LoginScreen() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
        <Logo className='fill-zinc-900 w-24' />
        <LoginForm />
    </div>
  )
}
