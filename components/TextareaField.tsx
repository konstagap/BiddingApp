'use client'
import { cn } from '@/lib/tw-merge'
import React, { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label: ReactNode
  error: FieldError | undefined
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextareaField = React.forwardRef(({ label, error, id, ...rest }: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <div
      className={cn('form-control w-full max-w-lg', {
        'mb-4': !error?.message
      })}>
      <label className='label' htmlFor={id}>
        <span className='label-text'>{label}</span>
      </label>
      <textarea
        id={id}
        ref={ref}
        {...rest}
        className={cn('textarea textarea-bordered h-24 w-full max-w-lg', {
          'textarea-error': error,
          'textarea-accent': !error
        })}
      />

      <label className={cn({ label: error?.message })}>
        <span className={cn({ 'label-text-alt text-error': error?.message })}>{error?.message}</span>
      </label>
    </div>
  )
})

TextareaField.displayName = 'TextareaField'

export default TextareaField
