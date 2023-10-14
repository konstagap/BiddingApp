'use client'
import { cn } from '@/lib/tw-merge'
import React, { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label: ReactNode
  error: FieldError | undefined
} & React.InputHTMLAttributes<HTMLInputElement>

const InputField = React.forwardRef(({ label, error, type = 'text', id, ...rest }: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
  // console.log('rest', rest)
  // console.log('error', error)
  return (
    <div
      className={cn('form-control w-full max-w-lg', {
        'mb-4': !error?.message
      })}>
      <label className='label' htmlFor={id}>
        <span className='label-text'>{label}</span>
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        {...rest}
        className={cn('input input-bordered w-full max-w-lg', {
          'input-error': error,
          'input-accent': !error
        })}
      />
      <label className={cn({ label: error?.message })}>
        <span className={cn({ 'label-text-alt text-error': error?.message })}>{error?.message}</span>
      </label>
    </div>
  )
})

InputField.displayName = 'InputField'

export default InputField
