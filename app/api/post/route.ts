import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/db/prisma'
import { jobValidationSchema } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

  const body = await req.json()

  let valid
  try {
    valid = jobValidationSchema.validateSync(body)
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
