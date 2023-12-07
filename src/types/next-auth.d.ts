import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
      username: string
      createdAt: string
      updatedAt: string
    }
  }
  interface User {
    _id: string
    username: string
    createdAt: string
    updatedAt: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      _id: string
      username: string
      createdAt: string
      updatedAt: string
    }
  }
}
