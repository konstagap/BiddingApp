import NextAuth, { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions as NextAuthConfig } from 'next-auth'

export const authOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) {
          throw new Error('Please enter an email and password')
        }
        // check to see if user exists
        const user = await prisma.user.findUnique({ where: { email: creds.email } })

        if (!user) throw new Error('User not found')
        // check to see if password matches
        const passwordMatch = await bcrypt.compare(creds.password, user.password)
        // if password does not match
        if (!passwordMatch) throw new Error('Incorrect password')

        return user
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  secret: 'process.env.SECRET',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthConfig

const handler = NextAuth(authOptions)

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return args.length === 0 ? getServerSession(authOptions) : getServerSession(...args, authOptions)
}

export { handler as GET, handler as POST }
