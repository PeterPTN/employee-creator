import Form from '../components/form/Form'
import { UpdateEmployee } from '../lib/UpdateEmployee'
import { useMutation } from 'react-query';
import { queryClient } from '../App';
import { useAppDispatch, useAppSelector } from '../utils/redux-hooks';
import { updateEmployee } from '../utils/employee-services';
import { SubmitHandler } from 'react-hook-form'
import { storeEmployees } from '../slices/employeeSlice';
import { Employee } from '../lib/Employee';

const UpdateEmployeeModal = ({ handleModalState }: { handleModalState: (arg0: boolean) => void }) => {
  const mutation = useMutation(updateEmployee);
  const dispatch = useAppDispatch();
  const employeeData = useAppSelector((state) => state.employees.chosenEmployee);

  const onSubmit: SubmitHandler<Employee> = data => {
    mutation.mutate(data, {
      onSuccess: async () => {
        queryClient.invalidateQueries()
        const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
        dispatch(storeEmployees(newEmployees));
        handleModalState(false);
        // Add redux state to notify successful submission
      }
    })
  }

  return (
    <div>
      <Form employeeData={employeeData} formType='update' onSubmit={onSubmit} />
    </div>
  )
}

export default UpdateEmployeeModal