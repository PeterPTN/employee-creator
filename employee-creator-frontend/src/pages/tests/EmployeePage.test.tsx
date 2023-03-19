import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import EmployeePage from "../EmployeePage"
import '@testing-library/jest-dom'
import { Provider } from "react-redux"
import { store } from "../../store"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

describe("After employee page fully loads", () => {
    beforeEach(async () => {
        render(
            <>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <EmployeePage />
                    </Provider>
                </QueryClientProvider>
            </>
        );

        // Renders loading bar while data is fetching
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    })

    it("should render employee cards when data is fetched", () => {
        const employeeName = screen.getByRole("employee-name");
        expect(employeeName).toBeInTheDocument();
    })
})
