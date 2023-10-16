'use client'
import InputField from '@/components/InputField'
import SubmitButton from '@/components/SubmitButton'
import TextareaField from '@/components/TextareaField'
import { TjobSchema, jobValidationSchema } from '@/lib/types'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Create = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError
  } = useForm<TjobSchema>({
    resolver: yupResolver(jobValidationSchema)
  })

  async function onSubmit(form: TjobSchema) {
    try {
      if (isSubmitting) return

      const res = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Something went wrong.' + res.status)

      const data = await res.json()
      window.scrollTo(0, 0)

      setTimeout(() => router.replace(`/post/${data.id}`), 3000)
    } catch (error: any) {
      setError('name', {
        type: 'server',
        message: error.message
      })
    }
  }

  return (
    <div className='flex flex-col justify-center px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl'>Create job</h2>
          <div className='alert border border-info my-2'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-info shrink-0 w-6 h-6'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <span>By defaul all jobs expires in 24hours.</span>
          </div>

          {isSubmitSuccessful && (
            <div className='alert alert-success'>
              <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <div>
                <h3 className='font-bold'>Success!</h3>
                <div className='text-xs'>You have created a posting, you will be redirected in 3 seconds.</div>
              </div>
            </div>
          )}

          <InputField id='name' error={errors.name} {...register('name')} label='What is your name?' placeholder='ex. John Doe' />

          <InputField
            id='contact'
            type='email'
            error={errors.contact}
            {...register('contact')}
            label='Provide and email for contact'
            placeholder='ex. john@mail.com'
          />

          <TextareaField id='description' error={errors.description} {...register('description')} label='Provide a job description' />

          <TextareaField id='requirements' error={errors.requirements} {...register('requirements')} label='Provide a job requirements' />

          <InputField id='bid' type='number' defaultValue={0} error={errors.bid} {...register('bid')} label='Provide a initial bid amount' />
          <SubmitButton
            loading={isSubmitting}
            labels={{
              default: 'Create posting',
              loading: 'Creating...'
            }}
          />
        </form>
        <p className='mt-10 text-center text-sm'>
          <Link href='/' className='font-semibold text-accent hover:text-accent-focus'>
            Go back to main board
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Create
