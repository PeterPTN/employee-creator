import { QueryClientProvider, QueryClient } from "react-query";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { RootState } from "../store";
import { Provider } from "react-redux";
import { Employee } from "../lib/Employee";
import { render } from "@testing-library/react";
import employeeReducer from '../slices/employee-slice/employeeSlice';
import appReducer from '../slices/app-slice/appSlice';
import React from "react";

interface EmployeeState {
    originalSource: Employee[],
    modifiedSource: Employee[],
    chosenEmployee: Employee,
    searchType: "firstName"
}

interface AppState extends RootState {
    employees: EmployeeState
}

const queryClient = new QueryClient();

// ---- ---- ---- ---- ---- //

export function renderWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                employees: employeeReducer,
                app: appReducer
            },
            preloadedState,
        }),
        ...renderOptions
    }: {
        preloadedState?: Partial<AppState>;
        // Set to return value of configureStore()
        store?: ReturnType<typeof configureStore>;
    } = {}
) {
    function Wrapper({ children }: { children: any }) {
        return (
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>{children}</Provider>
                </QueryClientProvider>
            </MemoryRouter>
        );
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
