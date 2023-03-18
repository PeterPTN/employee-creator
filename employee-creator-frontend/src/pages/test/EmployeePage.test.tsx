import { cleanup, render, screen } from "@testing-library/react"
import EmployeePage from "../EmployeePage"
import '@testing-library/jest-dom'


describe("Employee Page", () => {
    beforeEach(() => {
        render(<EmployeePage />);
    })

    afterEach(() => {
        cleanup();
    })

    describe("Employee Filter Component", () => {
        it("Renders the employee-filter component", () => {
            const searchbarContainer = screen.getByRole("searchbar-container");
            expect(searchbarContainer).toBeInTheDocument();

            // Add search bar when complete
            // Add filter button
        })
    })
 
    // Make mock axios calls
    // https://stackoverflow.com/questions/70450576/how-to-test-react-component-with-axios-request-in-useeffect
    it("Renders an error message when an error is thrown", () => {

    })

    it("Renders a loading message while fetching data", () => {

    })

    it("Renders the employee cards when data is fetched", () => {

    })
})

