import { auth } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import React from 'react'
import BidderBanner from './BidderBanner'

type Props = {}

async function Hero({}: Props) {
  const session = await auth()

  const user = session?.user || null
  return (
    <>
      {user ? (
        <BidderBanner user={user} />
      ) : (
        <div className='hero bg-base-300 mb-5 rounded-lg'>
          <div className='hero-content text-left lg:text-center'>
            <div className='max-w-md'>
              <h1 className='text-2xl lg:text-5xl font-bold'>Hello there 🥳</h1>
              <p className='py-6'>Thank you for visitng the Bidding app, where you can bid and post a job, please login to get started.</p>
              <Link href='/login' className='btn btn-sm lg:btn-md btn-accent'>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
