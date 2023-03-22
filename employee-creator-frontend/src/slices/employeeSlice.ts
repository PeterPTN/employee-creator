import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Employee } from '../lib/Employee'

type SortBy = keyof Employee

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        originalSource: [] as Employee[],
        modifiedSource: [] as Employee[],
        chosenEmployee: {} as Employee,
        searchType: "firstName"
    },
    reducers: {
        storeEmployees(state, action) {
            // Must be mutated, don't create new 
            state.originalSource.splice(0, state.originalSource.length, ...action.payload)
            state.modifiedSource = state.originalSource.sort((a,b) => a.firstName > b.firstName ? 1 : a.firstName < b.firstName ? -1 : 0);
        },
        sortEmployees(state, action: PayloadAction<{ sortBy: SortBy; descending: boolean }>) {
            const { sortBy, descending } = action.payload;
            if (!sortBy) return;

            state.modifiedSource.sort((a, b) => {    
              let result = a[sortBy]! < b![sortBy]! ? -1 : a[sortBy]! > b[sortBy]! ? 1 : 0;
              if (descending) result *= -1;
              return result;
            })
        },
        setEmployeeSearchType(state, action) {
            state.searchType = action.payload.toLowerCase();
        },
        searchEmployeeBy(state, action) {
        const searchValue = action.payload;
        state.modifiedSource = state.originalSource.filter((employee) => {
            let filterSource;
            if (state.searchType === "firstName") filterSource = `${employee[state.searchType]} ${employee.lastName}`.toLowerCase();
            else filterSource = `${employee[state.searchType]}`.toLowerCase();

            return filterSource.includes(searchValue);
        });
        },
        setChosenEmployee(state, action) {
            state.chosenEmployee = {...action.payload};
        }
    }
})

export const { storeEmployees, sortEmployees, setChosenEmployee, searchEmployeeBy, setEmployeeSearchType } = employeeSlice.actions

export default employeeSlice.reducer