import { Employee } from '../../lib/Employee'
import tw from "twin.macro"

const Container = tw.div`
    flex
    flex-nowrap
    gap-x-2
`

const Field = tw.p`
   flex-1
`

const EmployeeCard = ({ employee }: { employee: Employee }) => {
    const name = `${employee.firstName} ${employee?.middleName} ${employee.lastName}`;
    const jobStatus = `${employee.contractType} ${employee.jobType}`;

    // Refactor styling
    return (
        <Container>
            <Field className='w-1/4'>{name}</Field>
            <Field>{employee.mobile}</Field>
            <Field>{employee.address}</Field>
            <p className='w-[15rem] break-words'>{employee.email}</p>
            <Field>{jobStatus}</Field>
            <p className="w-[4rem] text-center">{employee.weeklyHours}</p>
            <Field>{employee.startDate}</Field>
            <Field>{employee?.endDate ? employee.endDate : "Ongoing"}</Field>
        </Container>
    )
}

export default EmployeeCard