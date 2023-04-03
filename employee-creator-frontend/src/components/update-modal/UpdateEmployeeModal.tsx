import { useAppDispatch, useAppSelector } from '../../utils/redux-hooks';
import { storeEmployees } from '../../slices/employee-slice/employeeSlice';
import { updateEmployee } from '../../utils/employee-services';
import { setIsModalOpen } from '../../slices/app-slice/appSlice';
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query';
import { queryClient } from '../../App';
import { Employee } from '../../lib/Employee';
import { useState } from 'react';
import styles from './UpdateEmployeeModal.module.scss';
import Form from '../form/Form';

const UpdateEmployeeModal = () => {
  const [error, setError] = useState(false);
  const mutation = useMutation(updateEmployee);
  const dispatch = useAppDispatch();
  const employeeData = useAppSelector((state) => state.employees.chosenEmployee);

  const onSubmit: SubmitHandler<Employee> = data => {
    setError(false);
    if (data.endDate === "" && data.ongoing === false) {
      setError(true);
      return;
    }

    let validData = data;
    if (data?.ongoing) validData = { ...data, endDate: "" }
    delete validData.ongoing;

    mutation.mutate(validData, {
      onSuccess: async () => {
        queryClient.invalidateQueries()
        const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
        dispatch(storeEmployees(newEmployees));
        dispatch(setIsModalOpen(false));
      },
      onError: (error) => console.log(error)
    })
  }

  return (
    <div className={styles.UpdateModal}>
      {error && <h4 className={styles.Error}>Please select an end date or tick ongoing.</h4>}
      <Form employeeData={employeeData} formType='update' onSubmit={onSubmit} />
    </div>
  )
}

export default UpdateEmployeeModal