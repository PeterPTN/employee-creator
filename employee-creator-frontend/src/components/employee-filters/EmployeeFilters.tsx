import styles from './EmployeeFilters.module.scss'

const EmployeeFilters = () => {
    return (
        <div className={styles.EmployeeFilters} role="searchbar-container">
            <div className={styles.SearchBarContainer}>
                <svg className="w-4 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(245,245,245)">
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.22 15.41,12.81 14.5,14L19.25,18.75L18,20L13.25,15.25C12.06,15.91 10.68,16.28 9.25,16.28A6.5,6.5 0 0,1 3.5,10.5A6.5,6.5 0 0,1 9.5,3M9.5,5A4.5,4.5 0 0,0 5,9.5A4.5,4.5 0 0,0 9.5,14A4.5,4.5 0 0,0 14,9.5A4.5,4.5 0 0,0 9.5,5Z" />
                </svg>

                {/* Strictly a placeholder */}
                <form action="">
                    <input type="text" placeholder='Search by &#129066;' />
                </form>
            </div>

            {/* Create modal or carousel for filter list -- call sortEmployees */}
            <button>Name</button>
        </div>
    )
}

export default EmployeeFilters