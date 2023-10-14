import { DefaultSession } from 'next-auth'

type Role = 'BIDDER' | 'POSTER'

declare module 'next-auth' {
  interface Session {
    user: { email: string; role: Role }
  }

  interface User {
    id: string
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}
