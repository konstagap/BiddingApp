import { prisma } from '@/lib/db/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../auth/[...nextauth]/route'
import { Role } from '@prisma/client'

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

  const body = await req.json()

  const { role } = body
  const options: Role[] = ['BIDDER', 'POSTER']

  if (!role || !options.includes(role)) return new NextResponse('Missing Fields', { status: 400 })

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: { role: role }
  })

  console.log('updated', updated)

  return NextResponse.json({ message: 'Role updated' })
}

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  return NextResponse.json({ role: user?.role })
}
