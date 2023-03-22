import { useAppDispatch, useAppSelector } from '../utils/redux-hooks';
import { storeEmployees } from '../slices/employeeSlice';
import { updateEmployee } from '../utils/employee-services';
import { SubmitHandler } from 'react-hook-form'
import { ModalContext } from '../contexts/ModalProvider';
import { useMutation } from 'react-query';
import { queryClient } from '../App';
import { useContext } from 'react';
import { Employee } from '../lib/Employee';
import styles from './UpdateEmployeeModal.module.scss';
import Form from '../components/form/Form';

const UpdateEmployeeModal = () => {
  const mutation = useMutation(updateEmployee);
  const dispatch = useAppDispatch();
  const employeeData = useAppSelector((state) => state.employees.chosenEmployee);
  const { setIsModalOpen } = useContext(ModalContext);

  const onSubmit: SubmitHandler<Employee> = data => {
    mutation.mutate(data, {
      onSuccess: async () => {
        queryClient.invalidateQueries()
        const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
        dispatch(storeEmployees(newEmployees));
        setIsModalOpen(false);
        // Add redux or context state to notify successful submission
      }
    })
  }

  return (
    <div className={styles.UpdateModal}>
      <Form employeeData={employeeData} formType='update' onSubmit={onSubmit} />
    </div>
  )
}

export default UpdateEmployeeModal