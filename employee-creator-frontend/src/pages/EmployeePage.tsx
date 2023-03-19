import { useAppSelector } from '../utils/reduxHooks';
import { useQuery } from 'react-query';
import { Employee } from '../lib/Employee';
import getAllEmployees from '../utils/getAllEmployees'
import EmployeeCard from '../components/employee-card/EmployeeCard';
import Main from '../layouts/main/Main'
import { storeEmployees } from "../slices/employeeSlice";
import { useAppDispatch } from '../utils/reduxHooks';
import { useEffect } from 'react';
import EmployeeFilters from '../components/employee-filters/EmployeeFilters';


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

      {isLoading && <h2>Loading...</h2>}

     <EmployeeFilters />

      {employees?.map((employee: Employee) => (
        <EmployeeCard key={employee.id} employee={employee}></EmployeeCard>
      ))}

    </Main>
  )
}

export default EmployeePage