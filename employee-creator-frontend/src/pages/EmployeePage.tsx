import { useContext, useEffect } from 'react';
import { getAllEmployees } from '../utils/employee-services'
import { useAppSelector } from '../utils/redux-hooks';
import { storeEmployees } from "../slices/employeeSlice";
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
  const {isModalOpen, setIsModalOpen} = useContext(ModalContext);

  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useQuery<Employee[], { message: string }>(["getAllEmployees"], getAllEmployees);
  const employees = useAppSelector(state => state.employees.modifiedSource);

  const mockData: Employee[] = [
    {
      id: 1,
      firstName: 'Peter',
      middleName: "Thanh",
      lastName: "Nguyen",
      email: "fake@gmail.com",
      mobile: "5555555555",
      address: "123 Fake St",
      contractType: "Full-Time",
      jobType: "Developer",
      weeklyHours: 40,
      startDate: "01-01-2023"
    }
  ]

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
      document.addEventListener('keydown', escapeHandler);
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