'use client'

import { logOut } from '@/lib/services/userService'

type Props = {}

const LogOutButton = (props: Props) => {
  return <a onClick={logOut}>Logout</a>
}

export default LogOutButton
