import { createEmployee } from '../utils/employee-services';
import { CreateEmployee } from '../lib/CreateEmployee';
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './CreateEmployeePage.module.scss'
import Form from '../components/form/Form';
import Main from '../layouts/main/Main'

const CreateEmployeePage = () => {
  const mutation = useMutation(createEmployee);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateEmployee> = data => {
    const testDate: CreateEmployee = {
      firstName: "Betty",
      middleName: "",
      lastName: "Fox",
      email: "Betty.fox@example.com",
      mobile: "0412345678",
      address: "123 Main Street",
      contractType: "Contract",
      jobType: "Full-Time",
      weeklyHours: 40,
      startDate: "2022-01-01",
      endDate: ""
    }

    mutation.mutate(data, {
      onSuccess: async () => {
        navigate("/");
        // Add redux or context state to notify successful submission
      }
    })
  };

  return (
    <Main>
      <Form formType="create" onSubmit={onSubmit} />
    </Main>
  )
}

export default CreateEmployeePage