import Link from 'next/link'
import styles from './page.module.css'
import SignupForm from './SignupForm'

const SignupPage = () => {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.h1}>Sign-up</h1>
        <SignupForm />
        <p className={styles.external}>
          Already have an account?{' '}
          <Link className={styles.link} href="/">
            Sign-In
          </Link>
        </p>
      </div>
    </main>
  )
}
export default SignupPage
