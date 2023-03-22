import { useAppSelector } from '../utils/redux-hooks';
import { useQuery } from 'react-query';
import { Employee } from '../lib/Employee';
import { getAllEmployees } from '../utils/employee-services'
import EmployeeCard from '../components/employee-card/EmployeeCard';
import Main from '../layouts/main/Main'
import { storeEmployees } from "../slices/employeeSlice";
import { useAppDispatch } from '../utils/redux-hooks';
import { useEffect, useState } from 'react';
import EmployeeFilters from '../components/employee-filters/EmployeeFilters';
import UpdateEmployeeModal from './UpdateEmployeeModal';

// Use shared form components
const EmployeePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Main>
      {error && <h2>{error.message}</h2>}

      {isLoading && <h2>Loading...</h2>}

      <EmployeeFilters />

      {employees?.map((employee: Employee) => (
        <EmployeeCard handleModalState={setIsModalOpen} key={employee.id} employee={employee}></EmployeeCard>
      ))}

      {isModalOpen && <UpdateEmployeeModal handleModalState={setIsModalOpen} />}
      
      
    </Main>
  )
}

export default EmployeePage