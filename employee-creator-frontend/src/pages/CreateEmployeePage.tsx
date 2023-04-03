import { setAtCurrentNav } from '../slices/app-slice/appSlice';
import { createEmployee } from '../utils/employee-services';
import { CreateEmployee } from '../lib/CreateEmployee';
import { useAppDispatch } from '../utils/redux-hooks';
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Form from '../components/form/Form';

const CreateEmployeePage = () => {
  const mutation = useMutation(createEmployee);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateEmployee> = data => {
    mutation.mutate(data, {
      onSuccess: async () => {
        dispatch(setAtCurrentNav(""));
        navigate("/");
        // Add redux or context state to notify successful submission
      }
    })
  };

  return (
    <div>
      <Form formType="create" onSubmit={onSubmit} />
    </div>
  )
}

export default CreateEmployeePage