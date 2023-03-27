import { renderWithProviders } from "../../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { Employee } from "../../lib/Employee";
import Form from "./Form";

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

const onSubmit = vi.fn();
const setIsModalOpen = vi.fn();

// ---- ---- ---- ---- ---- //

describe('Form Component', () => {
    beforeEach(() => {
        renderWithProviders(<Form onSubmit={onSubmit} formType="update" employeeData={employee} />)
    })

    it('should render all form fields', () => {
        expect(screen.getByLabelText("First Name:*")).toBeInTheDocument();
        expect(screen.getByLabelText("Middle Name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name:*")).toBeInTheDocument();
        expect(screen.getByLabelText("Email:*")).toBeInTheDocument();
        expect(screen.getByLabelText("Mobile:*")).toBeInTheDocument();
        expect(screen.getByLabelText("Address:*")).toBeInTheDocument();
        expect(screen.getByLabelText("Full-Time")).toBeInTheDocument();
        expect(screen.getByLabelText("Part-Time")).toBeInTheDocument();
        expect(screen.getByLabelText("Permanent")).toBeInTheDocument();
        expect(screen.getByLabelText("Contract")).toBeInTheDocument();
        expect(screen.getByLabelText("Weekly Hours:*")).toBeInTheDocument();
        expect(screen.getByLabelText("Start Date:*")).toBeInTheDocument();
        expect(screen.getByLabelText("End Date:")).toBeInTheDocument();
        expect(screen.getByLabelText("Ongoing")).toBeInTheDocument();
    })

    it('should pre-fill form fields with employee data', () => {
        expect(screen.getByLabelText("First Name:*")).toHaveValue(employee.firstName);
        expect(screen.getByLabelText("Middle Name:")).toHaveValue(employee.middleName);
        expect(screen.getByLabelText("Last Name:*")).toHaveValue(employee.lastName);
        expect(screen.getByLabelText("Email:*")).toHaveValue(employee.email);
        expect(screen.getByLabelText("Mobile:*")).toHaveValue(employee.mobile);
        expect(screen.getByLabelText("Address:*")).toHaveValue(employee.address);
        expect(screen.getByLabelText("Full-Time")).toBeChecked();
        expect(screen.getByLabelText("Permanent")).toBeChecked();
        expect(screen.getByLabelText("Weekly Hours:*")).toHaveValue(employee.weeklyHours.toString());
        expect(screen.getByLabelText("Start Date:*")).toHaveValue(employee.startDate);
        expect(screen.getByLabelText("End Date:")).toHaveValue(employee.endDate);
    });

    it('should change form fields values with user inputs', () => {
        const firstNameInput = screen.getByLabelText("First Name:*");
        const middleNameInput = screen.getByLabelText("Middle Name:");
        const lastNameInput = screen.getByLabelText("Last Name:*");
        const emailInput = screen.getByLabelText("Email:*");
        const mobileInput = screen.getByLabelText("Mobile:*");
        const addressInput = screen.getByLabelText("Address:*");
        const partTimeInput = screen.getByLabelText("Part-Time");
        const contractInput = screen.getByLabelText("Contract");
        const weeklyHoursInput = screen.getByLabelText("Weekly Hours:*");
        const startDateInput = screen.getByLabelText("Start Date:*");
        const endDateInput = screen.getByLabelText("End Date:");

        fireEvent.change(firstNameInput, { target: { value: "John" } });
        fireEvent.change(middleNameInput, { target: { value: "" } });
        fireEvent.change(lastNameInput, { target: { value: "Connor" } });
        fireEvent.change(emailInput, { target: { value: "terminatorHater@gmail.com" } });
        fireEvent.change(mobileInput, { target: { value: "0455555555" } });
        fireEvent.change(addressInput, { target: { value: "50 Real St" } });
        fireEvent.click(partTimeInput);
        fireEvent.click(contractInput);
        fireEvent.change(weeklyHoursInput, { target: { value: "16" } });
        fireEvent.change(startDateInput, { target: { value: "1999-01-01" } });
        fireEvent.change(endDateInput, { target: { value: "2000-01-01" } });

        expect(firstNameInput).toHaveValue("John");
        expect(middleNameInput).toHaveValue("");
        expect(lastNameInput).toHaveValue("Connor");
        expect(emailInput).toHaveValue("terminatorHater@gmail.com");
        expect(mobileInput).toHaveValue("0455555555");
        expect(addressInput).toHaveValue("50 Real St");
        expect(partTimeInput).toBeChecked();
        expect(contractInput).toBeChecked();
        expect(weeklyHoursInput).toHaveValue("16");
        expect(startDateInput).toHaveValue("1999-01-01");
        expect(endDateInput).toHaveValue("2000-01-01");
    });

    it("should render errors when form is submitted with empty inputs", async () => {
        const submitButton = screen.getByRole("submit");
        const firstNameInput = screen.getByLabelText("First Name:*");
        const lastNameInput = screen.getByLabelText("Last Name:*");
        const emailInput = screen.getByLabelText("Email:*");
        const mobileInput = screen.getByLabelText("Mobile:*");
        const addressInput = screen.getByLabelText("Address:*");
        const jobTypeInput = screen.getByLabelText("Full-Time");
        const contractInput = screen.getByLabelText("Permanent");
        const weeklyHoursInput = screen.getByLabelText("Weekly Hours:*");
        const startDateInput = screen.getByLabelText("Start Date:*");
        const endDateInput = screen.getByLabelText("End Date:");

        fireEvent.change(firstNameInput, { target: { value: "" } });
        fireEvent.change(lastNameInput, { target: { value: "" } });
        fireEvent.change(emailInput, { target: { value: "" } });
        fireEvent.change(mobileInput, { target: { value: "" } });
        fireEvent.change(addressInput, { target: { value: "" } });
        fireEvent.change(jobTypeInput, { target: { checked: false } });
        fireEvent.change(contractInput, { target: { checked: false } });
        fireEvent.change(weeklyHoursInput, { target: { value: "" } });
        fireEvent.change(startDateInput, { target: { value: "" } });
        fireEvent.change(endDateInput, { target: { value: "" } });
        fireEvent.click(submitButton);

        // Requires async/await to wait for the error message to appear
        const firstNameErrorMessage = await screen.findByText("First name required");
        expect(firstNameErrorMessage).toBeInTheDocument();

        const lastNameErrorMessage = await screen.findByText("Last name required");
        expect(lastNameErrorMessage).toBeInTheDocument();

        const emailErrorMessage = await screen.findByText("Email required");
        expect(emailErrorMessage).toBeInTheDocument();

        const mobileErrorMessage = await screen.findByText("Mobile required");
        expect(mobileErrorMessage).toBeInTheDocument();

        const addressErrorMessage = await screen.findByText("Address required");
        expect(addressErrorMessage).toBeInTheDocument();

        const jobTypeErrorMessage = await screen.findByText("Please select a job type");
        expect(jobTypeErrorMessage).toBeInTheDocument();

        const contractErrorMessage = await screen.findByText("Please select a contract type");
        expect(contractErrorMessage).toBeInTheDocument();

        const weeklyHoursErrorMessage = await screen.findByText("Please enter a number");
        expect(weeklyHoursErrorMessage).toBeInTheDocument();

        const startDateErrorMessage = await screen.findByText("Please enter a starting date");
        expect(startDateErrorMessage).toBeInTheDocument();
    })

    it("should render errors when form is submitted with invalid inputs", async () => {
        const submitButton = screen.getByRole("submit");
        const firstNameInput = screen.getByLabelText("First Name:*");
        const lastNameInput = screen.getByLabelText("Last Name:*");
        const emailInput = screen.getByLabelText("Email:*");
        const mobileInput = screen.getByLabelText("Mobile:*");
        const addressInput = screen.getByLabelText("Address:*");
        const jobTypeInput = screen.getByLabelText("Full-Time");
        const contractInput = screen.getByLabelText("Permanent");
        const weeklyHoursInput = screen.getByLabelText("Weekly Hours:*");
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().substring(0, 10);
        const startDateInput = screen.getByLabelText("Start Date:*");

        fireEvent.change(firstNameInput, { target: { value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } });
        fireEvent.change(lastNameInput, { target: { value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } });
        fireEvent.change(emailInput, { target: { value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } });
        fireEvent.change(mobileInput, { target: { value: "1234567890123" } });
        fireEvent.change(addressInput, { target: { value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } });
        fireEvent.change(jobTypeInput, { target: { checked: false } });
        fireEvent.change(contractInput, { target: { checked: false } });
        fireEvent.change(weeklyHoursInput, { target: { value: "100" } });
        fireEvent.change(startDateInput, { target: { value: tomorrowFormatted }});
        fireEvent.click(submitButton);

        // Requires async/await to wait for the error message to appear
        const firstNameErrorMessage = await screen.findByText("First name can't be over 50 characters");
        expect(firstNameErrorMessage).toBeInTheDocument();

        const lastNameErrorMessage = await screen.findByText("Last name can't be over 50 characters");
        expect(lastNameErrorMessage).toBeInTheDocument();

        const emailErrorMessage = await screen.findByText("Email can't be over 75 characters");
        expect(emailErrorMessage).toBeInTheDocument();

        const mobileErrorMessage = await screen.findByText("Mobile can't be over 10 digits");
        expect(mobileErrorMessage).toBeInTheDocument();

        const addressErrorMessage = await screen.findByText("Address can't be over 75 characters");
        expect(addressErrorMessage).toBeInTheDocument();

        const jobTypeErrorMessage = await screen.findByText("Please select a job type");
        expect(jobTypeErrorMessage).toBeInTheDocument();

        const contractErrorMessage = await screen.findByText("Please select a contract type");
        expect(contractErrorMessage).toBeInTheDocument();

        const weeklyHoursErrorMessage = await screen.findByText("Hours cannot be greater than 99");
        expect(weeklyHoursErrorMessage).toBeInTheDocument();

        const startDateErrorMessage = await screen.findByText("The starting date cannot be in the future");
        expect(startDateErrorMessage).toBeInTheDocument();
    })

    it('should call onSubmit function when form is submitted', () => {
        const submitButton = screen.getByRole("submit");
        expect(submitButton).toBeInTheDocument();
        submitButton.addEventListener('click', () => onSubmit());
        fireEvent.click(submitButton);
        expect(onSubmit).toHaveBeenCalled();
    })

    it("should render close button and call setIsModal on user click", () => {
        const closeButton = screen.getByRole("close-button");
        expect(closeButton).toBeInTheDocument();
        closeButton.addEventListener('click', () => setIsModalOpen());
        fireEvent.click(closeButton);
        expect(setIsModalOpen).toHaveBeenCalled();
    })
})