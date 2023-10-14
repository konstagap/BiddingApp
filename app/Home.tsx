import Link from 'next/link'
import { get10RecentPostings, getTop10ActivePostigns } from './page'

export default async function Home() {
  const recent10 = await get10RecentPostings()
  const top10 = await getTop10ActivePostigns()

  return (
    <section>
      <div className='hero bg-base-200 mb-5'>
        <div className='hero-content text-center '>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Hello there</h1>
            <p className='py-6'>Thank you for visitng the Bidding app, where you can bid and post a job, please login to get started.</p>
            <Link href='/login' className='btn btn-accent'>
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className='flex w-full lg:flex-row flex-col gap-4 justify-around'>
        <div className=''>
          <h2 className='text-2xl text-slate-300 font-bold'>Top 10 recent postings</h2>
          <div className='overflow-x-auto border border-cyan-400 rounded-md p-2 my-2'>
            <table className='table lg:table-lg'>
              {/* head */}
              <thead>
                <tr>
                  {Object.keys(recent10[0]).map((key) => (
                    <th key={key + 1}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent10.map((posting) => (
                  <tr key={posting.id} className='hover'>
                    <td>{posting.userId}</td>
                    <td>{posting.id}</td>
                    <td>{posting.title}</td>
                    <td>{posting.completed ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className='text-2xl text-slate-300font-bold'>Top 10 active jobs</h2>
          <div className='overflow-x-auto border border-accent rounded-md p-2 my-2'>
            <table className='table lg:table-lg'>
              <thead>
                <tr>
                  {Object.keys(top10[0]).map((key) => (
                    <th key={key + 1}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent10.map((posting) => (
                  <tr key={posting.id} className='hover'>
                    <td>{posting.userId}</td>
                    <td>{posting.id}</td>
                    <td>{posting.title}</td>
                    <td>{posting.completed ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
