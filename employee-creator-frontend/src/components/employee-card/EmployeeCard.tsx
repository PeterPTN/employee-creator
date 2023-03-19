import { Employee } from '../../lib/Employee'

const EmployeeCard = ({ employee }: { employee: Employee }) => {
    const name = `${employee.firstName} ${employee?.middleName} ${employee.lastName}`;
    const jobStatus = `${employee.contractType} ${employee.jobType}`;

    return (
        <div>
            <p role="employee-name">{name}</p>
            <p>{employee.mobile}</p>
            <p>{employee.address}</p>
            <p>{employee.email}</p>
            <p>{jobStatus}</p>
            <p>{employee.weeklyHours}</p>
            <p>{employee.startDate}</p>
            <p>{employee?.endDate ? employee.endDate : "Ongoing"}</p>
        </div>
    )
}

export default EmployeeCard