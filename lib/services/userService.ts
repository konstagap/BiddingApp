import { signIn, signOut } from 'next-auth/react'
import { Role, TloginSchema, TregisterSchema } from '../types'

export const signInUser = async ({ email, password }: TloginSchema) => {
  const res = await signIn('credentials', {
    email,
    password,
    redirect: true,
    callbackUrl: '/'
  })

  if (res?.error) throw new Error(res.error)
}

export const registerUser = async ({ email, password }: TregisterSchema) => {
  const res = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const error = new Error()
    if (res.status === 400) {
      error.message = await res.text()
    } else {
      error.message = res.statusText
    }
    throw error
  }

  return res
}

export const logOut = () => signOut()

export const getRole = async () => {
  const res = await fetch('/api/role')
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

export const updateRole = async (role: Role) => {
  const res = await fetch('/api/role', {
    method: 'PUT',
    body: JSON.stringify({ role })
  })
  if (!res.ok) throw new Error('Something went wrong')
  return await res.json()
}
