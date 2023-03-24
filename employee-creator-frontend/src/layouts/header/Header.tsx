import Nav from "../../components/nav/Nav";
import styles from './Header.module.scss'
import user from '../../assets/user.png'


const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={styles.Banner}>
                <h1>Neospective</h1>

                <ul>
                    <li>+</li>
                    <li className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="rgb(245,245,245)" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V9c0-3.31-2.69-6-6-6s-6 2.69-6 6v7l-2 2v1h16v-1l-2-2zm-6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </li>
                    <li><img src={user} alt="User avatar" className="cursor-pointer" /></li>
                </ul>
            </div>

            <h2>Employees</h2>

            <Nav />
        </div>
    )
}

export default Header