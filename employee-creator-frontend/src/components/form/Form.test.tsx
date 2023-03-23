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

    it('should call onSubmit function when form is submitted', () => {
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
        form.addEventListener('submit', onSubmit);
        fireEvent.submit(form);
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