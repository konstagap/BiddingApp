'use client'
import InputField from '@/components/InputField'
import SubmitButton from '@/components/SubmitButton'
import { TregisterSchema, registerValidationSchema } from '@/lib/types'
import { registerUser } from '@/lib/services/userService'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Register = (props: {}) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<TregisterSchema>({ resolver: yupResolver(registerValidationSchema) })

  async function onSubmit(form: TregisterSchema) {
    try {
      if (isSubmitting) return
      await registerUser(form)
      router.replace('/login')
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
          <h2 className='text-3xl'>Create a new account</h2>

          <InputField
            id='email'
            type='email'
            error={errors.email}
            {...register('email')}
            label='What is your email?'
            placeholder='ex. john.doe@mail.com'
          />

          <InputField id='password' type='password' error={errors.password} {...register('password')} label='What is your p*****d?' />
          <InputField id='confirmPassword' type='password' error={errors.confirmPassword} {...register('confirmPassword')} label='Confirm p*****d' />

          <SubmitButton
            loading={isSubmitting}
            labels={{
              default: 'Register',
              loading: 'Processing...'
            }}
          />
        </form>
        <p className='mt-10 text-center text-sm'>
          Have an account?{' '}
          <Link href='/login' className='font-semibold text-accent hover:text-accent-focus'>
            Go to sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
