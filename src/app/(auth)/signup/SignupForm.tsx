'use client'
import { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirm }),
    })
    const { data, error } = await res.json()

    if (error) {
      setError(error)
    } else {
      router.push('/')
    }
  }

  return (
    <form className={styles.form} onSubmit={signupUser}>
      <div className={styles.field}>
        <label className={styles.field__label}>Username</label>
        <input
          className={styles.field__input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.field__label}>Password</label>
        <input
          className={styles.field__input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.field__label}>Confirm Password</label>
        <input
          className={styles.field__input}
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      <div className={styles.error}>
        {error && <p className={styles.error__message}>{error}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  )
}
export default SignupForm
