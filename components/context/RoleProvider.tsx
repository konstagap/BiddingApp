'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type RoleState = {
  loading: boolean
  error: ''
  role: 'BIDDER' | 'POSTER'
}

type ContextType = {
  isBidder: boolean
  changeRole: () => void
  loading: boolean
  error: string
}

const RoleContext = createContext<ContextType>({} as ContextType)

export const RoleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [roleState, setRoleState] = useState<RoleState>({ loading: false, error: '', role: 'POSTER' })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/role')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        console.log('data', data)
        setRoleState((prev) => ({ ...prev, role: data.role, loading: false }))
      } catch (error: any) {
        setRoleState((prev) => ({ ...prev, error: error.message, loading: false }))
      }
    })()
  }, [])

  async function changeRole() {
    try {
      setRoleState((prev) => ({ ...prev, error: '', loading: false }))
      const newRole = roleState.role === 'BIDDER' ? 'POSTER' : 'BIDDER'
      const res = await fetch('/api/role', {
        method: 'PUT',
        body: JSON.stringify({ role: newRole })
      })
      if (!res.ok) throw new Error('Something went wrong')
      setRoleState((prev) => ({ ...prev, role: newRole, loading: false }))
    } catch (error: any) {
      console.log('error', error?.message)
      setRoleState((prev) => ({ ...prev, error: error?.message, loading: false }))
    }
  }

  return (
    <RoleContext.Provider value={{ isBidder: roleState.role === 'BIDDER', changeRole, loading: roleState.loading, error: roleState.error }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useBidder() {
  return useContext(RoleContext)
}
