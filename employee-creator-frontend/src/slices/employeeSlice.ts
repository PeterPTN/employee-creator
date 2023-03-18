import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Employee } from '../lib/Employee'

type SortBy = keyof Employee

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        originalSource: [] as Employee[],
        modifiedSource: [] as Employee[]
    },
    reducers: {
        storeEmployees(state, action) {
            // Must be mutated, don't create new 
            state.originalSource.splice(0, state.originalSource.length, ...action.payload)
            state.modifiedSource = state.originalSource;
        },
        sortEmployees(state, action: PayloadAction<{ sortBy: SortBy; descending: boolean }>) {
            const { sortBy, descending } = action.payload;
            if (!sortBy) return;

            state.modifiedSource.sort((a, b) => {    
              let result = a[sortBy]! < b![sortBy]! ? -1 : a[sortBy]! > b[sortBy]! ? 1 : 0;
              if (descending) result *= -1;
              return result;
            })
        }
    }
})

export const {storeEmployees} = employeeSlice.actions

export default employeeSlice.reducer