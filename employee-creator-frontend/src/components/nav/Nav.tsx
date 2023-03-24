import { RouteHighlighterContext } from "../../contexts/RouteHighlighterProvider"
import { useContext } from "react"
import { Link } from "react-router-dom"
import styles from './Nav.module.scss'

const Nav = () => {
    const { atCurrentNav, setAtCurrentNav } = useContext(RouteHighlighterContext);

    return (
        <ul className={styles.Nav}>
            <li>
                <Link
                    style={{ textDecoration: atCurrentNav === "" ? 'underline' : 'none' }}
                    onClick={() => setAtCurrentNav("")}
                    role="view-link" to="/">View All
                </Link>
            </li>

            <li>
                <Link
                    style={{ textDecoration: atCurrentNav === "create" ? 'underline' : 'none' }}
                    onClick={() => setAtCurrentNav("create")}
                    role="add-link" to="/create">Add
                </Link>
            </li>
        </ul>
    )
}

export default Nav