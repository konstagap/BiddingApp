'use client'

import { logOut } from '@/lib/services/userService'
import { useRouter } from 'next/navigation'
import { useBidder } from './context/RoleProvider'

type Props = {}

const LogOutButton = (props: Props) => {
  const router = useRouter()

  function handleLogout() {
    logOut().then(() => {
      router.replace('/')
    })
  }

  return <a onClick={handleLogout}>Logout</a>
}

export default LogOutButton
