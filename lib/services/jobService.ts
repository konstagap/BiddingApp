import { prisma } from '../db/prisma'
import { TjobSchema } from '../types'

export const get10LatestJobs = async () => {
  return prisma.job.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getTop10Jobs = async () => {
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

  const top10Combined = top10.map((el) => ({ ...el, count: top10CountToMap[el.id] })).sort((a, b) => b.count - a.count)
  return top10Combined
}
