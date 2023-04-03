import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from './slices/employee-slice/employeeSlice'
import appSlice from "./slices/app-slice/appSlice";

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
        app: appSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;