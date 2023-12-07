import { connectToMongoDB } from '@/lib/connectToMongoDB'
import Book, { Books } from '@/models/Book'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import User from '@/models/User'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/authOptions'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  try {
    await connectToMongoDB()
    let book = await Book.findOne({ volume_id: params.id })

    let newBook: Partial<Books> = {
      volume_id: params.id,
      title: body.volumeInfo.title,
    }
    if (body.volumeInfo.authors) {
      newBook.author = body.volumeInfo.authors[0]
    }

    if (body.volumeInfo.imageLinks) {
      newBook.cover = body.volumeInfo.imageLinks.thumbnail
    }

    if (!book) {
      book = await Book.create(newBook)
    }

    const session = await getServerSession(authOptions)
    const user = await User.findById(session?.user._id)
    if (!user) {
      return NextResponse.json({ error: 'user not found' })
    }

    await User.findByIdAndUpdate(
      user._id,
      { $push: { books: book._id } },
      { new: true }
    )

    revalidatePath('/dashboard', 'page')
    return NextResponse.json({ data: book })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'unable to add book' })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const bookId = params.id
  if (!bookId) {
    return NextResponse.json({ error: 'book not found' })
  }

  try {
    await connectToMongoDB()

    const session = await getServerSession(authOptions)
    const user = await User.findById(session?.user._id)
    if (!user) {
      return NextResponse.json({ error: 'user not found' })
    }

    await User.findByIdAndUpdate(
      user._id,
      { $pull: { books: bookId } },
      { new: true }
    )

    revalidatePath('/dashboard', 'page')
    return NextResponse.json({ data: 'book sucessfully removed' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'unable to add book' })
  }
}
