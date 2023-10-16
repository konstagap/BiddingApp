'use client'
import { cn } from '@/lib/tw-merge'
import { isJobExpired } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useBidder } from './context/RoleProvider'
import { useLatestBid } from './hooks/useLatestBid'
import { useSetLowesttBid } from './hooks/useSetLowerBid'

type Props = {
  job: {
    id: string
    bid: number
    name: string
    contact: string
    description: string
    requirements: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }
}

export const BiddingSection = ({ job }: Props) => {
  const { isBidder, error } = useBidder()

  const showMessageOrEnded = (str: string) => {
    return cn({
      [str]: !isJobExpired(job.createdAt),
      ['🏁 Bidding ended']: isJobExpired(job.createdAt)
    })
  }

  if (error)
    return (
      <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
        <div className='ml-4 flex-shrink-0'>
          <Link href='/login' className='font-medium text-accent btn'>
            {showMessageOrEnded('Login to place a bid')}
          </Link>
        </div>
      </li>
    )

  if (!isBidder)
    return (
      <>
        <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
          <div className='ml-4 flex-shrink-0'>{showMessageOrEnded('You are currently not a Bidder')}</div>
        </li>
      </>
    )

  if (isBidder) return <PlaceAbid job={job} />
}

function PlaceAbid({ job }: Props) {
  const { data } = useLatestBid(job.id, isJobExpired(job.createdAt))
  const { trigger, isMutating } = useSetLowesttBid()

  const session = useSession()

  const lowestBid = data?.bid?.bid ?? job.bid

  async function setLowerBid() {
    try {
      const result = await trigger({ jobId: job.id, currentBid: lowestBid })
    } catch (e) {
      // error handling
      // show that bid didnt pass, maybe toast will be good
    }
  }

  const youWinning = session.data?.user?.email === data?.bid?.user?.email
  const isExpired = isJobExpired(job.createdAt)

  return (
    <>
      <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
        <div className='flex w-0 flex-1 items-center'>
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium text-success'>Lowest bid</span>
          </div>
        </div>
        <div className='ml-4 flex-shrink-0'>
          <span className='font-medium text-accent '>$ {lowestBid}</span>
        </div>
      </li>
      <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
        <div className='flex w-full justify-start'>
          {youWinning && (
            <span className={'btn btn-outline btn-success'}>
              {cn({
                'You are winning': youWinning && !isExpired,
                'You won!': youWinning && isExpired
              })}
            </span>
          )}
        </div>
        {isExpired ? (
          <span className={'btn btn-outline btn-disabled'}>🏁 Ended</span>
        ) : (
          <div className='flex w-full justify-end'>
            <button className='btn btn-outline btn-warning' disabled={isMutating} onClick={setLowerBid}>
              Place a bid
            </button>
          </div>
        )}
      </li>
    </>
  )
}
