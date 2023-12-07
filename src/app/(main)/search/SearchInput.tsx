'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'

const SearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  let timeout: NodeJS.Timeout | null = null

  const searchBooks = async (query: string) => {
    if (timeout) clearTimeout(timeout)

    if (query.length > 3) {
      timeout = setTimeout(() => {
        const params = new URLSearchParams(searchParams)
        params.set('q', query)
        router.replace(`${pathname}?${params}`)
      }, 500)
    }
  }

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search for a book..."
      onChange={(e) => searchBooks(e.target.value)}
    />
  )
}
export default SearchInput
