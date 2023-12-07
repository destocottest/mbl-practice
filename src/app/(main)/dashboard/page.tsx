import { getServerSession } from 'next-auth'
import styles from './page.module.css'
import { connectToMongoDB } from '@/lib/connectToMongoDB'
import User from '@/models/User'
import BookList from './BookList'
import Book from '@/models/Book'
import { authOptions } from '@/lib/authOptions'

const getBooks = async (userId: string | undefined) => {
  if (!userId) return
  await connectToMongoDB()
  return await User.findById(userId)
    .populate({ path: 'books', model: Book })
    .select('books')
}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)
  const user = await getBooks(session?.user._id)

  return (
    <>
      <h2 className={styles.title}>{session?.user.username} - ALL BOOKS</h2>
      <BookList books={user.books} />
    </>
  )
}
export default DashboardPage
