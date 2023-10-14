'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/tw-merge'
import { useBidder } from './context/RoleProvider'

type Props = {}

const RoleSwitch = ({}: Props) => {
  const { isBidder, changeRole, loading } = useBidder()

  return (
    <div className='flex items-center gap-3 mb-5'>
      <span className={cn({ 'text-info': isBidder })}>Bidder</span>
      <input disabled={loading} type='checkbox' className='toggle toggle-lg' onChange={changeRole} checked={!isBidder} />
      <span className={cn({ 'text-info': !isBidder })}>Poster</span>
    </div>
  )
}

export default RoleSwitch
