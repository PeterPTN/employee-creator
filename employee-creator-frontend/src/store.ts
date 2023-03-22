import {configureStore} from "@reduxjs/toolkit"
import employeeReducer from './slices/employeeSlice'
import notificationsSlice from "./slices/notificationsSlice";

export const store =  configureStore({
    reducer: {
        employees: employeeReducer,
        notifications: notificationsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;