import { auth } from '@/app/api/auth/[...nextauth]/route'
import { BiddingSection } from '@/components/BiddingSection'
import CountDown from '@/components/CountDown'
import { prisma } from '@/lib/db/prisma'
import { cn } from '@/lib/tw-merge'
import { JobPost } from '@/lib/types'
import { add24Hours } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { ReactNode } from 'react'

type Props = {
  params: {
    id: string
  }
}

export default async function Posting({ params }: Props) {
  const session = await auth()

  const job = await prisma.job.findUnique({ where: { id: params.id } })
  console.log('product', job)

  if (!job) return notFound()

  const dlList = [
    {
      label: 'Customer name',
      value: job.name
    },
    {
      label: 'Job Description',
      value: job.description
    },
    {
      label: 'Contact information',
      value: job.contact
    },
    {
      label: 'Created at',
      value: job.createdAt.toLocaleString()
    },
    {
      label: 'Expires',
      value: add24Hours(job.createdAt).toLocaleString()
    },
    {
      label: 'Countdown',
      value: <CountDown expiresAt={add24Hours(job.createdAt)} />
    },
    {
      label: 'Job requirements',
      value: job.requirements
    }
  ]

  return (
    <div className='lg:max-w-xl'>
      <div className='px-4 sm:px-0'>
        <h3 className='font-semibold leading-7'>Job Information</h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 '>Details and application.</p>
      </div>
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          {dlList.map(({ label, value }) => (
            <DlItem key={label + value} label={label} value={value} />
          ))}
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 '>Activity</dt>
            <dd className='mt-2 text-sm  sm:col-span-2 sm:mt-0'>
              <ul role='list' className='divide-y divide-gray-100 rounded-md border border-gray-200'>
                <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
                  <div className='flex w-0 flex-1 items-center'>
                    <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                      <span className='truncate font-medium'>Initial bid</span>
                    </div>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <span className='font-medium text-accent '>$ {job.bid}</span>
                  </div>
                </li>
                <BiddingSection job={job} />
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

const DlItem = ({ label, value }: { label: ReactNode; value: ReactNode }) => (
  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
    <dt className='text-sm font-medium leading-6 '>{label}</dt>
    <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 break-words '>{value}</dd>
  </div>
)
