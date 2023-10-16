import * as yup from 'yup'
import { checkSizeInKb } from './utils'

export interface User {
  name: string
  email: string
}

export type Role = 'BIDDER' | 'POSTER'

export interface JobPost {
  id: string
  bid: number
  name: string
  contact: string
  description: string
  requirements: string
  userId: string
  createdAt: Date
  updatedAt: Date
  count?: number
}

export const loginValidationSchema = yup
  .object()
  .shape({
    email: yup.string().email().required('Email should be valid'),
    password: yup.string().min(5, 'Password should be at least 5 chars long').required()
  })
  .required()

export type TloginSchema = yup.InferType<typeof loginValidationSchema>

export const registerValidationSchema = yup
  .object()
  .shape({
    email: yup.string().email().required('Email should be valid'),
    password: yup.string().min(5, 'Password should be at least 5 chars long').required(),
    confirmPassword: yup
      .string()
      .min(5, 'Password should be at least 5 chars long')
      .test('passwords-match', 'Password does not match', function (value) {
        console.log('value', value)
        return this.parent.password === value
      })
      .required('Please confim your password.')
  })
  .required()

export type TregisterSchema = yup.InferType<typeof registerValidationSchema>

export const jobValidationSchema = yup
  .object()
  .shape({
    description: yup.string().test('not more than 16kb', 'Text could not be more than 16kb', checkSizeInKb).required(),
    requirements: yup.string().test('not more than 16kb', 'Text could not be more than 16kb', checkSizeInKb).required(),
    name: yup.string().max(200).required(),
    contact: yup.string().email('Email should be valid').required(),
    bid: yup.number().typeError('Amount must be a number').positive().integer().min(1).required('Value is required')
  })
  .required()

export type TjobSchema = yup.InferType<typeof jobValidationSchema>
