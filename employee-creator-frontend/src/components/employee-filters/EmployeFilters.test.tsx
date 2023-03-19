import { cleanup, render, screen } from "@testing-library/react"
import EmployeeFilters from '../employee-filters/EmployeeFilters'
import '@testing-library/jest-dom'

describe('Employee filters component', () => {
    beforeEach(() => render(<EmployeeFilters />))

    afterEach(() => cleanup());

    it("should have searchbar", () => {
        const searchbar = screen.getByRole('searchbar-container');
        expect(searchbar).toBeInTheDocument();
    })

    it("should have filter button", () => {
        const filterbutton = screen.getByRole('button');
        expect(filterbutton).toBeInTheDocument();
    })
})