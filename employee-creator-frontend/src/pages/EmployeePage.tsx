import { useContext, useEffect } from 'react';
import { getAllEmployees } from '../utils/employee-services'
import { useAppSelector } from '../utils/redux-hooks';
import { sortEmployees, storeEmployees } from "../slices/employeeSlice";
import { useAppDispatch } from '../utils/redux-hooks';
import { ModalContext } from '../contexts/ModalProvider';
import { useQuery } from 'react-query';
import { Employee } from '../lib/Employee';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import EmployeeFilters from '../components/employee-filters/EmployeeFilters';
import EmployeeCard from '../components/employee-card/EmployeeCard';
import Main from '../layouts/main/Main'

// Use shared form components
const EmployeePage = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const { data, error, isLoading } = useQuery<Employee[], { message: string }>(["getAllEmployees"], getAllEmployees);
  const employees = useAppSelector(state => state.employees.modifiedSource);

  useEffect(() => {
    if (data) dispatch(storeEmployees(data));
  }, [data])

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (event.target.className.includes("Modal")) setIsModalOpen(false);
    }

    const escapeHandler = (event: any) => {
      if (isModalOpen && event.key === "Escape") setIsModalOpen(false)
    }

    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', escapeHandler);

    return () => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', escapeHandler);
    }
  }, [isModalOpen])

  return (
    <Main>
      {error && <h2>{error.message}</h2>}

      {isLoading && <h2>Loading...</h2>}

      <EmployeeFilters />

      {employees?.map((employee: Employee) => (
        <EmployeeCard key={employee.id} employee={employee}></EmployeeCard>
      ))}

      {isModalOpen && <UpdateEmployeeModal />}
    </Main>
  )
}

export default EmployeePage