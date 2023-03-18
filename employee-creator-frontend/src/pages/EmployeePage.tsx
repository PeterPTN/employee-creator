import { useAppSelector } from '../utils/reduxHooks';
import { useQuery } from 'react-query';
import { Employee } from '../lib/Employee';
import getAllEmployees from '../utils/getAllEmployees'
import EmployeeCard from '../components/employee-card/EmployeeCard';
import Main from '../layouts/main/Main'
import tw from 'twin.macro';
import { storeEmployees } from "../slices/employeeSlice";
import { useAppDispatch } from '../utils/reduxHooks';
import { useEffect } from 'react';

const EmployeeFilterContainer = tw.div`
  flex
  items-center
`

const FilterButton = tw.button`
  
`


// Use shared form components
const EmployeePage = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery<Employee[], { message: string }>(["employees"], getAllEmployees);
  const employees = useAppSelector(state => state.employees.modifiedSource);

  useEffect(() => {
    if (data) dispatch(storeEmployees(data));
  }, [data])

  return (
    <Main>
      {error && <h2>{error.message}</h2>}

      {isLoading && <h2>Loading data...</h2>}
      <EmployeeFilterContainer role="searchbar-container">
        <div className="flex">
          <svg className="w-4 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(245,245,245)">
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.22 15.41,12.81 14.5,14L19.25,18.75L18,20L13.25,15.25C12.06,15.91 10.68,16.28 9.25,16.28A6.5,6.5 0 0,1 3.5,10.5A6.5,6.5 0 0,1 9.5,3M9.5,5A4.5,4.5 0 0,0 5,9.5A4.5,4.5 0 0,0 9.5,14A4.5,4.5 0 0,0 14,9.5A4.5,4.5 0 0,0 9.5,5Z" />
          </svg>

          <h2>Searchbar placeholder</h2>
        </div>

        {/* Create modal or carousel for filter list -- call sortEmployees */}
        <FilterButton>Name</FilterButton>
      </EmployeeFilterContainer>

      {employees?.map((employee: Employee) => (
        <EmployeeCard key={employee.id} employee={employee}></EmployeeCard>
      ))}

    </Main>
  )
}

export default EmployeePage