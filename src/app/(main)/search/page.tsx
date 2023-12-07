import { GoogleBook } from '@/types/types'
import SearchInput from './SearchInput'
import styles from './page.module.css'
import { FaSearch } from 'react-icons/fa'
import AddBookButton from './AddBookButton'

const getBooks = async (query: string) => {
  if (!query || query.length <= 3) return null

  const page = 1

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&projection=lite&startIndex=${
      (page - 1) * 8
    }&maxResults=8&fields=totalItems,items(id, volumeInfo(title, authors, imageLinks))
    `
  )
  const json = await res.json()
  return json
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string }
}) => {
  const books = await getBooks(searchParams.q)

  return (
    <>
      <h2 className={styles.title}>Search Books</h2>
      <div className={styles.search}>
        <SearchInput />
        <FaSearch className={styles.icon} />
      </div>
      <div className={styles.books}>
        {books &&
          books.items.map((book: GoogleBook) => (
            <div key={book.id} className={styles.book}>
              <div>
                <h3>{book.volumeInfo.title}</h3>
                {book.volumeInfo.authors && (
                  <small>{book.volumeInfo.authors[0]}</small>
                )}
                <AddBookButton book={book} />
              </div>
              <img
                src={
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : 'default_book_cover.jpg'
                }
                alt="book cover"
                className={styles.book__cover}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default SearchPage
