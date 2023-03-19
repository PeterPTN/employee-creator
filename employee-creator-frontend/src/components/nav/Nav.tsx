import { Link } from "react-router-dom"
import styles from './Nav.module.scss'

const Nav = () => {
    return (
        <div>
            <ul className={styles.Nav}>
                <li><Link to="/">View</Link></li>
                <li><Link to="/">Manage</Link></li>
            </ul>
        </div>
    )
}

export default Nav