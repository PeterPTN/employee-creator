import { useAppDispatch, useAppSelector } from '../../utils/redux-hooks';
import { storeEmployees } from '../../slices/employee-slice/employeeSlice';
import { updateEmployee } from '../../utils/employee-services';
import { setIsModalOpen } from '../../slices/app-slice/appSlice';
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query';
import { queryClient } from '../../App';
import { Employee } from '../../lib/Employee';
import styles from './UpdateEmployeeModal.module.scss';
import Form from '../form/Form';

const UpdateEmployeeModal = () => {
  const mutation = useMutation(updateEmployee);
  const dispatch = useAppDispatch();
  const employeeData = useAppSelector((state) => state.employees.chosenEmployee);

  const onSubmit: SubmitHandler<Employee> = data => {
    mutation.mutate(data, {
      onSuccess: async () => {
        queryClient.invalidateQueries()
        const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
        dispatch(storeEmployees(newEmployees));
        dispatch(setIsModalOpen(false));
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