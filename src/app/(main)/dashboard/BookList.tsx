import { Books } from '@/models/Book'
import styles from './page.module.css'
import RemoveBookButton from './RemoveBookButton'

const BookList = ({ books }: { books: Books[] }) => {
  return (
    <div className={styles.books}>
      {books &&
        books.map((book) => (
          <div key={book._id} className={styles.book}>
            <div>
              <h3>{book.title}</h3>
              {book.author && <small>{book.author}</small>}
              <RemoveBookButton bookId={book._id.toString()} />
            </div>
            <img
              src={book.cover ? book.cover : 'default_book_cover.jpg'}
              alt="book cover"
              className={styles.book__cover}
            />
          </div>
        ))}
    </div>
  )
}
export default BookList
