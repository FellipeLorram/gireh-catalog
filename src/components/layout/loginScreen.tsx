import React, { useEffect } from 'react'
import { LoginForm } from '../form/loginForm'
import Logo from './logo'
import { Loading } from './loading'

export function LoginScreen() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          <Logo className='fill-zinc-900 w-24' />
          <LoginForm />
        </div>
      )}
    </>
  )
}
