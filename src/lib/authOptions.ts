import { connectToMongoDB } from '@/lib/connectToMongoDB'
import User from '@/models/User'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password ' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { username, password } = credentials
        if (!username || !password) return null

        try {
          await connectToMongoDB()
          const doc = await User.findOne({ username })
          if (!doc) return null

          const isPasswordValid = await bcrypt.compare(password, doc.password)
          if (!isPasswordValid) return null

          const user = doc.toJSON()
          delete user.password

          return user
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}
