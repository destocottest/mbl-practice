'use client'
import { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const SigninForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const signinUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid Credentials')
    } else {
      router.replace('/dashboard')
    }
  }

  return (
    <form className={styles.form} onSubmit={signinUser}>
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
      <div className={styles.error}>
        {error && <p className={styles.error__message}>{error}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  )
}
export default SigninForm
