import { getAllEmployees } from '../utils/employee-services'
import { useAppSelector } from '../utils/redux-hooks';
import { storeEmployees } from "../slices/employee-slice/employeeSlice";
import { useAppDispatch } from '../utils/redux-hooks';
import { setIsModalOpen } from '../slices/app-slice/appSlice';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Employee } from '../lib/Employee';
import UpdateEmployeeModal from '../components/update-modal/UpdateEmployeeModal';
import EmployeeFilters from '../components/employee-filters/EmployeeFilters';
import EmployeeCard from '../components/employee-card/EmployeeCard';

// Use shared form components
const EmployeePage = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery<Employee[], { message: string }>(["getAllEmployees"], getAllEmployees);
  const isModalOpen = useAppSelector(state => state.app.isModalOpen);
  const employees = useAppSelector(state => state.employees.modifiedSource);

  useEffect(() => {
    if (data) dispatch(storeEmployees(data));
  }, [data])

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (event.target.className.includes("Modal")) dispatch(setIsModalOpen(false));
    }

    const escapeHandler = (event: any) => {
      if (isModalOpen && event.key === "Escape") dispatch(setIsModalOpen(false));
    }

    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', escapeHandler);

    return () => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', escapeHandler);
    }
  }, [isModalOpen])

  return (
    <div>
      {error && <h2>{error.message}</h2>}

      {isLoading && <h2>Loading...</h2>}

      <EmployeeFilters />

      {employees?.map((employee: Employee) => (
        <EmployeeCard key={employee.id} employee={employee}></EmployeeCard>
      ))}

      {isModalOpen && <UpdateEmployeeModal />}
    </div>
  )
}

export default EmployeePage