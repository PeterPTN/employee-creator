import { deleteEmployee, formatDateToAusStandard } from '../../utils/employee-services';
import { storeEmployees, setChosenEmployee } from '../../slices/employeeSlice';
import { useAppDispatch } from '../../utils/redux-hooks';
import { ModalContext } from '../../contexts/ModalProvider';
import { useMutation } from 'react-query';
import { queryClient } from '../../App';
import { useContext } from 'react';
import { Employee } from '../../lib/Employee'
import styles from './EmployeeCard.module.scss'

interface EmployeCardProps {
    employee: Employee,
}

const EmployeeCard = ({ employee }: EmployeCardProps) => {
    const { setIsModalOpen } = useContext(ModalContext);
    const name = `${employee.firstName} ${employee?.middleName} ${employee.lastName}`;
    const jobStatus = `${employee.contractType} ${employee.jobType}`;
    const startDate = formatDateToAusStandard(employee.startDate);
    const endDate = employee.endDate ? formatDateToAusStandard(employee.endDate) : "Ongoing";
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

    const handleClickUpdate = () => {
        setIsModalOpen(true);
        dispatch(setChosenEmployee(employee));
    }

    return (
        <div className={styles.EmployeeCard}>
            <p role="employee-name">{name}</p>
            <p role="employee-mobile">{employee.mobile}</p>
            <p role="employee-address">{employee.address}</p>
            <a role="employee-email" href={`mailto:${employee.email}`}>{employee.email}</a>
            <p role="employee-jobstatus" >{jobStatus}</p>
            <p role="employee-weeklyhours" >{employee.weeklyHours}</p>
            <p role="employee-startdate">{startDate}</p>
            <p role="employee-enddate" >{endDate}</p>
            <button role="update-button" onClick={handleClickUpdate}>Update</button>
            <button role="delete-button" onClick={() => handleClickDelete(employee.id)}>Delete</button>
        </div>
    )
}

export default EmployeeCard