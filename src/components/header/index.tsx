import styles from './header.module.css'
import logims from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

export function Header() {
    return(
        <header className={styles.container}>
            <Link to='/'>
                <img src={logims} alt='Logo crypto' />
            </Link>
        </header>
    )
}