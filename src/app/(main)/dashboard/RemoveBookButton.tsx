'use client'
import { FaRegTrashAlt } from 'react-icons/fa'
import styles from './page.module.css'

const RemoveBookButton = ({ bookId }: { bookId: string }) => {
  const removeBook = async () => {
    const res = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    })
    const { data, error } = await res.json()

    if (error) {
      console.log(error)
      alert(error)
    } else {
      alert(data)
    }
  }

  return (
    <div className={styles.remove}>
      <FaRegTrashAlt onClick={() => removeBook()} className={styles.icon} />
    </div>
  )
}
export default RemoveBookButton
