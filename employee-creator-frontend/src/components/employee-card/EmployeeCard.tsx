import { useMutation } from 'react-query';
import { storeEmployees, setChosenEmployee } from '../../slices/employeeSlice';
import { useAppDispatch } from '../../utils/redux-hooks';
import { Employee } from '../../lib/Employee'
import { deleteEmployee } from '../../utils/employee-services';
import { queryClient } from '../../App';
import styles from './EmployeeCard.module.scss'

interface EmployeCardProps {
    employee: Employee,
    handleModalState: (arg0: boolean) => void
}

const EmployeeCard = ({ employee, handleModalState }: EmployeCardProps) => {
    const name = `${employee.firstName} ${employee?.middleName} ${employee.lastName}`;
    const jobStatus = `${employee.contractType} ${employee.jobType}`;
    const mutation = useMutation(deleteEmployee);
    const dispatch = useAppDispatch();

    const handleClickDelete = (id: number) => {
        mutation.mutate(id, {
            onSuccess: async () => {
                // Invalidate cache so fetchQuery() fetches data from server and not from cache
                queryClient.invalidateQueries()
                const newEmployees = await queryClient.fetchQuery<Employee[]>("getAllEmployees");
                dispatch(storeEmployees(newEmployees));
            }
        });
    }

    const handleClickUpdate = (id: number) => {
        handleModalState(true);
        dispatch(setChosenEmployee(employee));
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
            <button onClick={() => handleClickUpdate(employee.id)}>Update</button>
            <button onClick={() => handleClickDelete(employee.id)}>Delete</button>
        </div>
    )
}

export default EmployeeCard