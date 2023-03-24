import { RouteHighlighterContext } from '../contexts/RouteHighlighterProvider';
import { createEmployee } from '../utils/employee-services';
import { CreateEmployee } from '../lib/CreateEmployee';
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Form from '../components/form/Form';

const CreateEmployeePage = () => {
  const mutation = useMutation(createEmployee);
  const { setAtCurrentNav } = useContext(RouteHighlighterContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateEmployee> = data => {
    mutation.mutate(data, {
      onSuccess: async () => {
        setAtCurrentNav("")
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