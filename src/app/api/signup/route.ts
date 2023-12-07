import { NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'
import { connectToMongoDB } from '@/lib/connectToMongoDB'
import User from '@/models/User'

export async function POST(req: Request) {
  const body = await req.json()
  const { username, password, confirm } = body

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 })
  }

  if (!password || !confirm || password !== confirm) {
    return NextResponse.json(
      { error: 'passwords do not match' },
      { status: 400 }
    )
  }

  try {
    await connectToMongoDB()
    const isUsernameTaken = await User.findOne({ username })

    if (isUsernameTaken) {
      return NextResponse.json({ error: 'username is taken' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      password: hashed,
    })

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    )
  }
}
