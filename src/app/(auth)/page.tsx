import Link from 'next/link'
import styles from './page.module.css'
import SigninForm from './SigninForm'

const SigninPage = () => {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.h1}>Sign-in</h1>
        <SigninForm />
        <p className={styles.external}>
          Don&t have an account?{' '}
          <Link className={styles.link} href="/signup">
            Sign-Up
          </Link>
        </p>
      </div>
    </main>
  )
}
export default SigninPage
