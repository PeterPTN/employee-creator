import { beforeEach, describe, it, afterEach, vi } from 'vitest'
import { act, cleanup, fireEvent, screen } from '@testing-library/react'
import { formatDateToAusStandard } from '../../utils/employee-services';
import { renderWithProviders } from '../../utils/test-utils';
import { Employee } from '../../lib/Employee';
import EmployeeCard from './EmployeeCard';

const employee: Employee = {
    id: 1,
    firstName: 'Peter',
    middleName: "Thanh",
    lastName: "Nguyen",
    email: "fake@gmail.com",
    mobile: "0455555555",
    address: "123 Fake St",
    contractType: "Permanent",
    jobType: "Full-Time",
    weeklyHours: 40,
    startDate: "2023-01-01",
    endDate: ""
}

describe("Employee Card", () => {
    beforeEach(() => {
        renderWithProviders(
            <EmployeeCard employee={employee} />
        )
    });

    afterEach(() => {
        cleanup();
    });

    it("should have these employee details", () => {
        const employeeName = screen.getByRole("employee-name");
        const employeeMobile = screen.getByRole("employee-mobile");
        const employeeAddress = screen.getByRole("employee-address");
        const employeeEmail = screen.getByRole("employee-email");
        const employeeJobStatus = screen.getByRole("employee-jobstatus");
        const employeeWeeklyHours = screen.getByRole("employee-weeklyhours");
        const employeeStartDate = screen.getByRole("employee-startdate");
        const employeeEndDate = screen.getByRole("employee-enddate");

        expect(employeeName).toHaveTextContent(
            `${employee.firstName} ${employee.middleName} ${employee.lastName}`
        );
        expect(employeeMobile).toHaveTextContent(employee.mobile);
        expect(employeeAddress).toHaveTextContent(employee.address);
        expect(employeeEmail).toHaveTextContent(employee.email);
        expect(employeeJobStatus).toHaveTextContent(employee.jobType);
        expect(employeeWeeklyHours).toHaveTextContent(`${employee.weeklyHours}`);
        expect(employeeStartDate).toHaveTextContent(formatDateToAusStandard(employee.startDate));
        expect(employeeEndDate).toHaveTextContent("Ongoing");
    });

    it("should have a delete button", () => {
        const deleteButton = screen.getByRole("delete-button");
        expect(deleteButton).toBeInTheDocument();
    });

    it("should call handleClickDelete on user click", async () => {
        const deleteButton = screen.getByRole("delete-button");
        expect(deleteButton).toBeInTheDocument();

        const handleClickDelete = vi.fn();
        deleteButton.addEventListener('click', handleClickDelete);

        await act(async () => {
            fireEvent.click(deleteButton);
        });

        expect(handleClickDelete).toHaveBeenCalledTimes(1);
    });

    it("should call handleClickUpdate on user click", async () => {
        const updateButton = screen.getByRole("delete-button");
        expect(updateButton).toBeInTheDocument();

        const handleClickUpdate = vi.fn();
        updateButton.addEventListener('click', handleClickUpdate);

        await act(async () => {
            fireEvent.click(updateButton);
        });

        expect(handleClickUpdate).toHaveBeenCalledTimes(1);
    });
})