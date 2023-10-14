import bcrypt from 'bcrypt'
import { prisma } from '@/lib/db/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) return new NextResponse('Missing Fields', { status: 400 })

  const exit = await prisma.user.findUnique({ where: { email: email } })
  if (exit) return new NextResponse('User alredy exists', { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  })

  return NextResponse.json(user)
}
