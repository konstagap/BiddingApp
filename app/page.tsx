import Hero from '@/components/Hero'
import Table from '@/components/Table'
import { get10LatestJobs, getTop10Jobs } from '@/lib/services/jobService'

export default async function Home() {
  const recent10 = await get10LatestJobs()
  const top10 = await getTop10Jobs()

  return (
    <section>
      <Hero />
      <div className='flex w-full lg:flex-row flex-col gap-4  justify-center'>
        <Table items={recent10} heading='Top 10 recent postings' />
        <Table showBids items={top10} heading='Top 10 active jobs' classsName='border-accent' />
      </div>
    </section>
  )
}
