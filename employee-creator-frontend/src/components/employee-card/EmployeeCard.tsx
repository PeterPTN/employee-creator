import { useMutation } from 'react-query';
import { storeEmployees } from '../../slices/employeeSlice';
import { useAppDispatch } from '../../utils/redux-hooks';
import { Employee } from '../../lib/Employee'
import { deleteThisEmployee } from '../../utils/employee-services';
import { queryClient } from '../../main';
import styles from './EmployeeCard.module.scss'

const EmployeeCard = ({ employee }: { employee: Employee }) => {
    const name = `${employee.firstName} ${employee?.middleName} ${employee.lastName}`;
    const jobStatus = `${employee.contractType} ${employee.jobType}`;
    const mutation = useMutation("deleteThisEmployee", deleteThisEmployee);
    const dispatch = useAppDispatch();

    const handleClickDelete = (id: number) => {
        mutation.mutate(id, {
            onSuccess: async () => {
                // Invalidate cache so fetchQuery() fetches data from server and not from cache
                //queryClient.invalidateQueries()
                //const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
                dispatch(storeEmployees(newEmployees));
            }
        });
    }

    return (
        <div className={styles.EmployeeCard}>
            <p role="employee-name">{name}</p>
            <p>{employee.mobile}</p>
            <p>{employee.address}</p>
            <p>{employee.email}</p>
            <p>{jobStatus}</p>
            <p>{employee.weeklyHours}</p>
            <p>{employee.startDate}</p>
            <p>{employee?.endDate ? employee.endDate : "Ongoing"}</p>
            <button onClick={() => handleClickDelete(employee.id)}>Delete</button>
        </div>
    )
}

export default EmployeeCard