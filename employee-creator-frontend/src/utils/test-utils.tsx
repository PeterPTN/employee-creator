import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { vi } from 'vitest'
// As a basic setup, import your same slice reducers
import employeeReducer from '../slices/employeeSlice';
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export function renderWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: { employees: employeeReducer },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: { children: any }) {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>{children}</Provider>
            </QueryClientProvider>
        );
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
