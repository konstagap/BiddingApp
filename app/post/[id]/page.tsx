import { BiddingSection } from '@/components/BiddingSection'
import CountDown from '@/components/CountDown'
import { prisma } from '@/lib/db/prisma'
import { add24Hours, getZeroTimeDate, isJobExpired } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  params: {
    id: string
  }
}

export default async function Posting({ params }: Props) {
  const job = await prisma.job.findUnique({ where: { id: params.id } })
  console.log('product', job)

  if (!job) return notFound()

  const isExpired = isJobExpired(job.createdAt)

  const rows = [
    {
      label: 'Customer name',
      value: job.name
    },
    {
      label: 'Description',
      value: job.description
    },
    {
      label: 'Requirements',
      value: job.requirements
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
      label: 'Expires at',
      value: add24Hours(job.createdAt).toLocaleString()
    },
    {
      label: 'Time left',
      value: <CountDown expiresAt={isExpired ? getZeroTimeDate() : add24Hours(job.createdAt)} />
    },

    {
      label: 'Activity',
      custom: true,
      value: (
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
      )
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
          {rows.map((row, index) => (
            <DetailsRow key={index} {...row} />
          ))}
        </dl>
      </div>
    </div>
  )
}

const DetailsRow = ({ label, value, custom = false }: { label: ReactNode; value: ReactNode; custom?: boolean }) => (
  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
    <dt className='text-sm font-medium leading-6 '>{label}</dt>
    {custom ? value : <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 break-words max-h-40 overflow-y-scroll'>{value}</dd>}
  </div>
)
