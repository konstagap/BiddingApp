import { cn } from '@/lib/tw-merge'
import type { JobPost } from '@/lib/types'
import { add24Hours, getZeroTimeDate, isJobExpired } from '@/lib/utils'
import Link from 'next/link'
import CountDown from './CountDown'

type Props = {
  items: JobPost[]
  heading: string
  classsName?: string
  showBids?: boolean
}

const Table = ({ items, heading, showBids, classsName = 'border-cyan-400' }: Props) => {
  const th = ['name', 'contact', 'description', 'expires', 'link']

  if (showBids) th.unshift('Total Bids 🔥')

  function ts(str: string) {
    const MAX_CHARS_IN_ROW = 15 // truncate string if more than 15 chars
    return str.length > MAX_CHARS_IN_ROW ? str.slice(0, MAX_CHARS_IN_ROW) + '...' : str
  }

  return (
    <div className='flex-1'>
      <h2 className='text-2xl text-slate-300 font-bold'>{heading}</h2>
      <div className={cn('overflow-x-auto border rounded-md p-2 my-2', classsName)}>
        <table className='table '>
          <thead>
            <tr>
              {th.map((key) => (
                <th key={key + 1}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((job) => (
              <tr key={job.id} className='hover'>
                {showBids && <td className='text-red-400'>{job.count}</td>}
                <td>{ts(job.name)}</td>
                <td>{ts(job.contact)}</td>
                <td>{ts(job.description)}</td>
                <td>
                  {isJobExpired(job.createdAt) ? <CountDown expiresAt={getZeroTimeDate()} /> : <CountDown expiresAt={add24Hours(job.createdAt)} />}
                </td>
                <td>
                  <Link href={`/post/${job.id}`} className='btn btn-active btn-link'>
                    details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
