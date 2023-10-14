import { cn } from '@/lib/tw-merge'
import type { JobPost } from '@/lib/types'
import Link from 'next/link'
import React from 'react'

type Props = {
  items: JobPost[]
  heading: string
  classsName?: string
  showBids?: boolean
}

const Table = ({ items, heading, showBids, classsName = 'border-cyan-400' }: Props) => {
  const th = ['name', 'contact', 'description', 'expires', 'link']

  if (showBids) th.unshift('Total Bids 🔥')

  const get24hrFromTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp)
    date.setHours(date.getHours() + 24)
    return date.toLocaleString()
  }

  function ts(str: string) {
    if (str.length > 15) {
      return str.slice(0, 15) + '...'
    } else {
      return str
    }
  }

  return (
    <div className='flex-1'>
      <h2 className='text-2xl text-slate-300 font-bold'>{heading}</h2>
      <div className={cn('overflow-x-auto border rounded-md p-2 my-2', classsName)}>
        <table className='table '>
          {/* head */}
          <thead>
            <tr>
              {th.map((key) => (
                <th key={key + 1}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((posting) => (
              <tr key={posting.id} className='hover'>
                {showBids && <td className='text-red-400'>{posting.count}</td>}
                <td>{ts(posting.name)}</td>
                <td>{ts(posting.contact)}</td>
                <td>{ts(posting.description)}</td>
                <td>{get24hrFromTimestamp(posting.createdAt)}</td>
                <td>
                  <Link href={`/post/${posting.id}`} className='btn btn-active btn-link'>
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
