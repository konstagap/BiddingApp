import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '../auth/[...nextauth]/route'
import { isJobExpired, twentyFourHoursinMs } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

  const searchParams = req.nextUrl.searchParams

  const jobId = searchParams.get('jobId')

  if (!jobId) return NextResponse.json({ error: 'No job id provided' }, { status: 400 })

  const lowestBid = await prisma.jobBid.findFirst({
    where: { jobId },
    orderBy: { bid: 'asc' },
    include: {
      job: {
        select: {
          createdAt: true
        }
      },
      user: {
        select: {
          email: true
        }
      }
    }
  })

  console.log('lowestBid', lowestBid)

  if (!lowestBid) return NextResponse.json({ error: 'No bids yet' }, { status: 404 })

  return NextResponse.json({ bid: lowestBid })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const body = (await req.json()) as { jobId: string; currentBid: number }
  if (!body.jobId) return NextResponse.json({ error: 'No job id provided' }, { status: 400 })
  if (isNaN(Number(body.currentBid)) || Number(body.currentBid) <= 1) return NextResponse.json({ error: 'Bid is not valid' }, { status: 400 })

  const job = await prisma.job.findUnique({ where: { id: body.jobId } })
  if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

  if (isJobExpired(job.createdAt)) return NextResponse.json({ error: 'Job expired' }, { status: 400 })

  const newLowestBid = await prisma.jobBid.create({
    data: {
      bid: Number(body.currentBid) - 1,
      jobId: body.jobId,
      userId: user.id
    }
  })

  return NextResponse.json({ bid: newLowestBid })
}
