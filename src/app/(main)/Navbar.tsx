import Link from 'next/link'
import styles from './page.module.css'
import SignoutButton from './SignoutButton'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  {
    href: '/search',
    label: 'Search',
  },
]

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <h2 className={styles.nav__brand}>My Book List</h2>
      <ul className={styles.nav__links}>
        {links.map((link) => (
          <Link href={link.href} key={link.label} className="btn btn-primary">
            {link.label}
          </Link>
        ))}
        <SignoutButton />
      </ul>
    </nav>
  )
}
export default Navbar
