import { SubmitHandler, useForm } from 'react-hook-form'
import { Employee } from '../lib/Employee';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { createEmployee } from '../utils/employee-services';
import styles from './CreateEmployeePage.module.scss'
import Main from '../layouts/main/Main'
import { queryClient } from '../App';
import { useAppDispatch } from '../utils/redux-hooks';
import { storeEmployees } from '../slices/employeeSlice';


// LATER:
// Highlight which ones are required, shake + red
const CreateEmployeePage = () => {
  const mutation = useMutation(createEmployee);
  const dispatch = useAppDispatch();
  
  // Methods will only work for type Employee
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Employee>();
  const onSubmit: SubmitHandler<Employee> = data => {
    mutation.mutate(data, {
      onSuccess: async () => {
        queryClient.invalidateQueries()
        const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
        dispatch(storeEmployees(newEmployees));
      }
    })
  };

  const handleEndDateClick = () => {
    const checkbox = document.getElementById("onGoing") as HTMLInputElement;
    if (checkbox.checked === true) checkbox.checked = false;
  }

  const handleOnGoingClick = () => {
    const checkbox = document.getElementById("endDate") as HTMLInputElement;
    if (checkbox.value) checkbox.value = "";
  }

  return (
    <Main>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateForm}>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="firstName">First Name:*</label>
        {/* { required: { value: true, message: "First Name Required" }, maxLength: 30 } */}
        <input id="firstName" {...register("firstName",)} />

        <label htmlFor="middleName">Middle Name: </label>
        <input id="middleName" {...register("middleName",)} />

        <label htmlFor="lastName">Last Name:*</label>
        <input id="lastName" {...register("lastName",)} />

        <label htmlFor="email">Email:*</label>
        <input id="email" {...register("email",)} />

        <label htmlFor="mobile">Mobile:*</label>
        <span>+61<input id="mobile" type="tel" {...register("mobile",)} /></span>

        <label htmlFor="address">Address:*</label>
        <input id="address" {...register("address",)} />

        <p>Job Type:*</p>
        <span>
          <label htmlFor="fullTime">Full-Time</label>
          <input type="radio" id="fullTime" value="Full-Time" {...register("jobType",)} />
        </span>
        <span>
          <label htmlFor="partTime">Part-Time</label>
          <input type="radio" id="partTime" value="Part-Time" {...register("jobType",)} />
        </span>

        <p>Contract Type:*</p>
        <span>
          <label htmlFor="permanent">Permanent</label>
          <input type="radio" id="permanent" value="Permanent" {...register("contractType",)} />
        </span>
        <span>
          <label htmlFor="contract">Contract</label>
          <input type="radio" id="contract" value="Contract" {...register("contractType",)} />
        </span>

        <label htmlFor="weeklyHours">Weekly Hours:*</label>
        <input id="weeklyHours" {...register("weeklyHours",)} />

        <label htmlFor="startDate">Start Date:*</label>
        <input type="date" id="startDate" {...register("startDate",)} />

        <label htmlFor="endDate">End Date:</label>
        <span onClick={handleEndDateClick}>
          <input type="date" id="endDate" {...register("endDate")} />
        </span>

        <span onClick={handleOnGoingClick}>
          <label htmlFor="onGoing">Ongoing</label>
          <input type="checkbox" id="onGoing" value="" {...register("endDate")} />
        </span>


        {/* onClick wipe date fields if ongoing is selected */}

        {errors.firstName && <span>{errors?.firstName?.message}</span>}
        <input type="submit" />
      </form>

    </Main>
  )
}

export default CreateEmployeePage