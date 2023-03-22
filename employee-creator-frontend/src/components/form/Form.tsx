import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateEmployee } from '../../lib/CreateEmployee';
import { Employee } from '../../lib/Employee';
import { populateFormWithEmployeeData } from '../../utils/employee-services';
import styles from './Form.module.scss'

interface FormProps {
    onSubmit: SubmitHandler<Employee>,
    formType: "update" | "create",
    employeeData?: CreateEmployee
}

const Form = ({ onSubmit, formType, employeeData }: FormProps) => {
    const additionalFormStyles = formType === "create" ? styles.CreateForm : styles.UpdateForm;

    const { setValue, register, handleSubmit, formState: { errors } } = useForm<Employee>();

    const handleEndDateClick = () => {
        const checkbox = document.getElementById("onGoing") as HTMLInputElement;
        if (checkbox.checked === true) checkbox.checked = false;
    }

    const handleOnGoingClick = () => {
        const checkbox = document.getElementById("endDate") as HTMLInputElement;
        if (checkbox.value) checkbox.value = "";
    }

    useEffect(() => {
        if (employeeData !== undefined) {
            populateFormWithEmployeeData(setValue, employeeData)
        }
    }, [employeeData])

    // Make input + labels into components somehow
    // Match maxLength to SpringAPI
    // Errors to shake + colored red
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={[styles.Form, additionalFormStyles].join(" ")}>
            <label htmlFor="firstName">First Name:*</label>
            <input id="firstName" {...register("firstName", {
                required: { value: true, message: "First name required" },
                maxLength: { value: 50, message: "Can't be over 50 characters" }
            })} />
            {errors.firstName && <p>{errors.firstName.message}</p>}

            <label htmlFor="middleName">Middle Name: </label>
            <input id="middleName" {...register("middleName",)} />

            <label htmlFor="lastName">Last Name:*</label>
            <input id="lastName" {...register("lastName", {
                required: { value: true, message: "Last name required" },
                maxLength: { value: 50, message: "Can't be over 50 characters" }
            })} />
            {errors.lastName && <p>{errors.lastName.message}</p>}

            <label htmlFor="email">Email:*</label>
            <input id="email" {...register("email", {
                required: { value: true, message: "Email required" },
                maxLength: { value: 75, message: "Can't be over 75 characters" }

            })} />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="mobile">Mobile:*</label>
            <span>+61<input id="mobile" type="tel" {...register("mobile", {
                required: { value: true, message: "Mobile required" },
                pattern: {value: /^\d+$/, message: "Must only contain numbers between 0-9"},
                maxLength: { value: 10, message: "Can't be over 10 digits" },
                minLength: {value: 10, message: "Must be a minimum of 10 digits"}
            })} /></span>
            {errors.mobile && <p>{errors.mobile.message}</p>}

            <label htmlFor="address">Address:*</label>
            <input id="address" {...register("address", {
                required: { value: true, message: "Address required" },
                maxLength: { value: 75, message: "Can't be over 75 characters" }
            })} />
            {errors.address && <p>{errors.address.message}</p>}

            <p>Job Type:*</p>
            <span>
                <label htmlFor="fullTime">Full-Time</label>
                <input type="radio" id="fullTime" value="Full-Time" {...register("jobType", {
                    required: { value: true, message: "Please select a job type" },
                })} />
            </span>
            <span>
                <label htmlFor="partTime">Part-Time</label>
                <input type="radio" id="partTime" value="Part-Time" {...register("jobType", {
                    required: { value: true, message: "Please select a job type" },
                })} />
            </span>
            {errors.jobType && <p>{errors.jobType.message}</p>}

            <p>Contract Type:*</p>
            <span>
                <label htmlFor="permanent">Permanent</label>
                <input type="radio" id="permanent" value="Permanent" {...register("contractType", {
                    required: { value: true, message: "Please select a contract type" },
                })} />
            </span>
            <span>
                <label htmlFor="contract">Contract</label>
                <input type="radio" id="contract" value="Contract" {...register("contractType", {
                    required: { value: true, message: "Please select a contract type" },
                })} />
            </span>
            {errors.contractType && <p>{errors.contractType.message}</p>}

            <label htmlFor="weeklyHours">Weekly Hours:*</label>
            <input id="weeklyHours" {...register("weeklyHours", {
                required: { value: true, message: "Please enter a number" },
                maxLength: { value: 2, message: "Number cannot be greater than 99" },
            })} />
            {errors.weeklyHours && <p>{errors.weeklyHours.message}</p>}

            <label htmlFor="startDate">Start Date:*</label>
            <input type="date" id="startDate" {...register("startDate", {
                required: { value: true, message: "Please enter a starting date" },
                validate: (value, _) => new Date(value) > new Date() ? "The starting date cannot be in the future" : true
            })} />
            {errors.startDate && <p>{errors.startDate.message}</p>}

            <label htmlFor="endDate">End Date:</label>
            <span onClick={handleEndDateClick}>
                <input type="date" id="endDate" {...register("endDate", {
                    validate: (value, _) => {
                        if (value) return new Date(value) > new Date() ? "The ending date cannot be in the future" : true
                    }
                })} />
            </span>
            {errors.endDate && <p>{errors.endDate.message}</p>}

            <span onClick={handleOnGoingClick}>
                <label htmlFor="onGoing">Ongoing</label>
                <input type="checkbox" id="onGoing" value="" {...register("endDate")} />
            </span>

            <input type="submit" />
        </form>
    )
}

export default Form