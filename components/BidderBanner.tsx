'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useBidder } from './context/RoleProvider'
import { cn } from '@/lib/tw-merge'

type Props = { user: { email: string } }

function BidderBanner({ user }: Props) {
  const { isBidder } = useBidder()

  return (
    <div className='alert border border-info mb-4'>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-info shrink-0 w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
      </svg>
      <div>
        <h3 className='font-bold'>
          Welcome <span className='text-white'>{user?.email},</span>
          <span> you are a {cn({ Bidder: isBidder, Poster: !isBidder })}</span>
        </h3>
        <div className='text-sm'>You can change role it by clicking on avatar</div>
        <div className='text-sm'>Bidder can bid on jobs while Poster can creat a job</div>
      </div>
      {isBidder ? null : (
        <Link href='/create' className='btn btn-sm lg:btn-md btn-accent'>
          Create new Job
        </Link>
      )}
    </div>
  )
}

export default BidderBanner
