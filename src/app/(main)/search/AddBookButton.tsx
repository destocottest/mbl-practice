'use client'
import { FaPlusCircle } from 'react-icons/fa'
import styles from './page.module.css'
import { GoogleBook } from '@/types/types'

const AddBookButton = ({ book }: { book: GoogleBook }) => {
  const addBook = async () => {
    const res = await fetch(`/api/books/${book.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
    const { data, error } = await res.json()

    if (error) {
      console.log(error)
      alert('error adding book')
    } else {
      alert('book added')
    }
  }

  return (
    <div className={styles.add}>
      <FaPlusCircle onClick={() => addBook()} className={styles.icon} />
    </div>
  )
}
export default AddBookButton
