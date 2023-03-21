import EmployeeCard from './EmployeeCard';
import { beforeEach, describe, it, afterEach } from 'vitest'
import { cleanup, screen } from '@testing-library/react'
import { Employee } from '../../lib/Employee';
import { renderWithProviders } from '../../utils/test-utils';

const employee: Employee = {
    id: 1,
    firstName: 'Peter',
    middleName: "Thanh",
    lastName: "Nguyen",
    email: "fake@gmail.com",
    mobile: 5555555555,
    address: "123 Fake St",
    contractType: "Full-Time",
    jobType: "Developer",
    weeklyHours: 40,
    startDate: "01-01-2023"
}

describe("Employee Card", () => {
    beforeEach(() => {
        renderWithProviders(
            <EmployeeCard employee={employee} />
        )
    })

    afterEach(() => {
        cleanup();
    })

    it("handleDeleteClick should run when user clicks it", () => {
        screen.debug()
    })
})