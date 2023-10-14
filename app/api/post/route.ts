import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/db/prisma'
import { postValidationSchema } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

  const body = await req.json()

  let valid
  try {
    valid = postValidationSchema.validateSync(body)
  } catch (e: any) {
    return NextResponse.json({ error: 'Invalid inputs' }, { status: 401 })
  }

  const { bid, description, name, requirements, contact } = valid

  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  if (user.role !== 'POSTER') return NextResponse.json({ error: 'Only Poster can create jobs' }, { status: 404 })

  const job = await prisma.job.create({
    data: {
      bid,
      description,
      name,
      requirements,
      contact,
      userId: user.id
    }
  })

  return NextResponse.json({ id: job.id })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  if (query === 'top10') {
    const topTenJobs = await prisma.jobBid.groupBy({
      by: ['jobId'],
      where: {
        createdAt: {
          gte: twentyFourHoursAgo
        }
      },
      take: 10,
      _count: true
    })

    return NextResponse.json({ jobs: twentyFourHoursAgo })
  }

  const latestJobs = await prisma.job.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json({ jobs: latestJobs })
}
