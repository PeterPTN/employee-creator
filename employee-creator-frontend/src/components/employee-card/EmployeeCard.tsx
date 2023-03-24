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
    const jobStatus = `${employee.contractType} - ${employee.jobType}`;
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
            <div className={styles.EmployeeLeftColumn}>
                <div style={{ display: "flex" }}>
                    <h4 role="employee-name">{name}</h4>
                </div>

                <div className={styles.EmployeeInfo}>
                    <div className={styles.PersonalDetails} >
                        <span>Mobile:<p role="employee-mobile">{employee.mobile}</p></span>
                        <span>Address:<p role="employee-address">{employee.address}</p></span>
                        <span>Email:<a role="employee-email" href={`mailto:${employee.email}`}>{employee.email}</a></span>
                    </div>

                    <div className={styles.JobDetails}>
                        <span>Job Status:<p role="employee-jobstatus" >{jobStatus}</p></span>
                        <span>Weekly Hours:<p role="employee-weeklyhours">{employee.weeklyHours}</p></span>
                        <span>Employment:<p role="employee-employmentdates">{startDate} - {endDate}</p></span>
                    </div>
                </div>
            </div>

            <div className={styles.EmployeeButton}>
                <button role="update-button" onClick={handleClickUpdate}>Update</button>
                <button role="delete-button" onClick={() => handleClickDelete(employee.id)}>Delete</button>
            </div>
        </div>
    )
}

export default EmployeeCard