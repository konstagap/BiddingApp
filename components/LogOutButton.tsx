'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {}

const LogOutButton = (props: Props) => {
  return <a onClick={() => signOut()}>Logout</a>
}

export default LogOutButton
