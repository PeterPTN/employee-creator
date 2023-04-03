import { setAtCurrentNav } from '../slices/app-slice/appSlice';
import { createEmployee } from '../utils/employee-services';
import { CreateEmployee } from '../lib/CreateEmployee';
import { useAppDispatch } from '../utils/redux-hooks';
import { SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './CreateEmployeePage.module.scss';
import Form from '../components/form/Form';

const CreateEmployeePage = () => {
  const [error, setError] = useState(false);
  const mutation = useMutation(createEmployee);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateEmployee> = data => {
    setError(false);
    if (data.endDate === "" && data.ongoing === false) {
      setError(true);
      return;
    }

    /*
    let validData = data;
    if (data?.ongoing) validData = { ...data, endDate: "" }
    delete validData.ongoing;
    */
    console.log(data)

    mutation.mutate(data, {
      onSuccess: async () => {
        dispatch(setAtCurrentNav(""));
        navigate("/");
      }
    })
  };

  return (
    <div>
      {error && <h4 className={styles.Error}>Please select an end date or tick ongoing.</h4>}
      <Form formType="create" onSubmit={onSubmit} />
    </div>
  )
}

export default CreateEmployeePage