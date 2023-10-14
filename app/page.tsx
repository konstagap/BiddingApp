import Hero from '@/components/Hero'
import Table from '@/components/Table'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {
  const recent10 = await prisma.job.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const top10Count = await prisma.jobBid.groupBy({
    by: ['jobId'],
    _count: {
      bid: true
    },
    orderBy: {
      _count: {
        bid: 'desc'
      }
    },
    take: 10
  })

  const top10CountToMap = top10Count.reduce((acc, el) => {
    acc[el.jobId] = el._count.bid
    return acc
  }, {} as Record<string, number>)

  const top10 = await prisma.job.findMany({
    where: {
      id: {
        in: Object.keys(top10CountToMap)
      }
    }
  })

  const top10Combined = top10
    .map((el) => {
      return { ...el, count: top10CountToMap[el.id] }
    })
    .sort((a, b) => b.count - a.count)

  return (
    <section>
      <Hero />
      <div className='flex w-full lg:flex-row flex-col gap-4  justify-center'>
        <Table items={recent10} heading='Top 10 recent postings' />
        <Table showBids items={top10Combined} heading='Top 10 active jobs' classsName='border-accent' />
      </div>
    </section>
  )
}
