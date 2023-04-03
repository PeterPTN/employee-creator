import { setAtCurrentNav } from "../../slices/app-slice/appSlice";
import { useAppDispatch } from "../../utils/redux-hooks";
import { useAppSelector } from "../../utils/redux-hooks";
import { Link } from "react-router-dom"
import styles from './Nav.module.scss'

const Nav = () => {
    const dispatch = useAppDispatch();
    const atCurrentNav = useAppSelector(state => state.app.atCurrentNav);

    return (
        <ul className={styles.Nav}>
            <li>
                <Link
                    style={{ textDecoration: atCurrentNav === "" ? 'underline' : 'none' }}
                    onClick={() => dispatch(setAtCurrentNav(""))}
                    role="view-link" to="/">View All
                </Link>
            </li>

            <li>
                <Link
                    style={{ textDecoration: atCurrentNav === "create" ? 'underline' : 'none' }}
                    onClick={() => dispatch(setAtCurrentNav("create"))}
                    role="add-link" to="/create">Add
                </Link>
            </li>
        </ul>
    )
}

export default Nav