import styles from "./Main.module.scss"

const Main = ({ children }: {children: any}) => {
    return (
        <div className={styles.Main}>
            {children}
        </div>
    )
}

export default Main