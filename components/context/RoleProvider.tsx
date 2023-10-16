'use client'
import { getRole, updateRole } from '@/lib/services/userService'
import { Role } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'

type RoleState = {
  loading: boolean
  error: ''
  role: Role | undefined
}

type ContextType = {
  isBidder: boolean
  role: Role | undefined
  changeRole: () => void
  loading: boolean
  error: string
}

const RoleContext = createContext<ContextType>({} as ContextType)

export const RoleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [roleState, setRoleState] = useState<RoleState>({ loading: false, error: '', role: undefined })

  useEffect(() => {
    getRole()
      .then((data) => setRoleState((prev) => ({ ...prev, role: data.role, loading: false })))
      .catch((error: any) => setRoleState((prev) => ({ ...prev, error: error.message, loading: false })))
  }, [])

  async function changeRole() {
    try {
      setRoleState((prev) => ({ ...prev, error: '', loading: false }))
      const newRole = roleState.role === 'BIDDER' ? 'POSTER' : 'BIDDER'
      await updateRole(newRole)
      setRoleState((prev) => ({ ...prev, role: newRole, loading: false }))
    } catch (error: any) {
      console.log('error', error?.message)
      setRoleState((prev) => ({ ...prev, error: error?.message, loading: false }))
    }
  }

  return (
    <RoleContext.Provider
      value={{ isBidder: roleState.role === 'BIDDER', role: roleState.role, changeRole, loading: roleState.loading, error: roleState.error }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useBidder() {
  return useContext(RoleContext)
}
