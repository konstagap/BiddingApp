'use client'
import InputField from '@/components/InputField'
import SubmitButton from '@/components/SubmitButton'
import { TloginSchema, loginValidationSchema } from '@/lib/types'
import { signInUser } from '@/lib/services/userService'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Login = (props: {}) => {
  const { data: session } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<TloginSchema>({ resolver: yupResolver(loginValidationSchema) })

  if (session?.user) return router.replace('/')

  async function onSubmit(form: TloginSchema) {
    try {
      if (isSubmitting) return
      await signInUser(form)
    } catch (error: any) {
      setError('email', {
        type: 'server',
        message: error.message
      })
    }
  }

  return (
    <div className='flex flex-col justify-center px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl'>Sign in</h2>

          <InputField
            id='email'
            type='email'
            error={errors.email}
            {...register('email')}
            label='What is your email?'
            placeholder='ex. john.doe@mail.com'
          />

          <InputField id='password' type='password' error={errors.password} {...register('password')} label='What is your p*****d?' />
          <SubmitButton
            loading={isSubmitting}
            labels={{
              default: 'Launch',
              loading: 'Launching...'
            }}
          />
        </form>
        <p className='mt-10 text-center text-sm'>
          Not a member?{' '}
          <Link href='/register' className='font-semibold text-accent hover:text-accent-focus'>
            Register account now for free
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
