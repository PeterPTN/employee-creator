import { searchEmployeeBy, setEmployeeSearchType } from '../../slices/employeeSlice';
import { useAppDispatch } from '../../utils/redux-hooks';
import { sortEmployees } from '../../slices/employeeSlice';
import { useState } from 'react';
import styles from './EmployeeFilters.module.scss'

const EmployeeFilters = () => {
    const dispatch = useAppDispatch();
    const searchTypeArray = ['firstName', 'mobile', "address", "email"]
    const [searchType, setSearchType] = useState(searchTypeArray[0]);
    const [descendingOrder, setDescendingOrder] = useState(true);

    const handleDescendingOrder = () => {
        dispatch(sortEmployees({ sortBy: searchTypeArray[0], descending: descendingOrder }))
        setDescendingOrder(!descendingOrder);
    }

    const handleEmployeeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchEmployeeBy(event.target.value));
    } 

    const handleSetSearchType = () => {
        const currentIndex = searchTypeArray.indexOf(searchType);
        const nextIndex = (currentIndex + 1) % searchTypeArray.length;
        dispatch(setEmployeeSearchType(searchTypeArray[nextIndex]))
        setSearchType(searchTypeArray[nextIndex]);
    }

    return (
        <>
            <div className={styles.EmployeeFilters}>
                <div className={styles.SearchBarContainer}>
                    <form>
                        <input onChange={handleEmployeeSearch} type="text" placeholder='Search by...' />
                    </form>

                    <button role="search-filter-button" onClick={handleSetSearchType}>{searchType === "firstName" ? 'Full name' : searchType}</button>
                </div>
            </div>

            <div>
                <h3>Sort by</h3>
                <button role="sort-button" onClick={handleDescendingOrder}>name {descendingOrder ? `↓` : `↑`}</button>
            </div>
        </>
    )
}

export default EmployeeFilters