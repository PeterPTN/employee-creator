import { describe, it } from "vitest";
import { Employee } from "../lib/Employee";
import reducer, {
    storeEmployees,
    sortEmployees,
    setChosenEmployee,
    searchEmployeeBy,
    setEmployeeSearchType
} from './employeeSlice'

const initialState = {
    originalSource: [] as Employee[],
    modifiedSource: [] as Employee[],
    chosenEmployee: {} as Employee,
    searchType: "firstName"
};

const employees: Employee[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        mobile: '555-555-5555',
        address: '123 Main St',
        contractType: 'Permanent',
        jobType: 'Full-Time',
        weeklyHours: 40,
        startDate: '2022-01-01',
        endDate: '',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        mobile: '555-555-5555',
        address: '123 Main St',
        contractType: 'Permanent',
        jobType: 'Part-Time',
        weeklyHours: 20,
        startDate: '2022-01-01',
        endDate: '',
    },
]

const loadedState = {
    originalSource: employees,
    modifiedSource: employees,
    chosenEmployee: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        mobile: '555-555-5555',
        address: '123 Main St',
        contractType: 'Permanent',
        jobType: 'Part-Time',
        weeklyHours: 20,
        startDate: '2022-01-01',
        endDate: '',
    },
    searchType: 'firstName'
}

describe('Employee Slice Actions', () => {
    it('should return the initial state', () => {
        // State, action
        expect(reducer(undefined, { type: undefined })).toEqual({
            originalSource: [],
            modifiedSource: [],
            chosenEmployee: {},
            searchType: "firstName"
        })
    })

    it('should store an array of employee-like objects', () => {
        expect(reducer(initialState, storeEmployees(employees))).toEqual({
            originalSource: employees,
            modifiedSource: employees.sort((a, b) => a.firstName > b.firstName ? 1 : a.firstName < b.firstName ? -1 : 0),
            chosenEmployee: {},
            searchType: "firstName"
        });
    })

    it('should sort the array of employees by name in ascending order', () => {
        expect(reducer(loadedState, sortEmployees({ sortBy: 'firstName', descending: false }))).toEqual({
            originalSource: employees,
            modifiedSource: employees,
            chosenEmployee: loadedState.chosenEmployee,
            searchType: loadedState.searchType
        });
    })

    it('should set a search type', () => {
        expect(reducer(initialState, setEmployeeSearchType("email"))).toEqual({
            originalSource: [],
            modifiedSource: [],
            chosenEmployee: {},
            searchType: "email"
        })
    })


    it('should filter employee list by input and search type', () => {
        expect(reducer(loadedState, searchEmployeeBy("jane"))).toEqual({
            originalSource: employees,
            // Jane
            modifiedSource: [loadedState.chosenEmployee],
            chosenEmployee: loadedState.chosenEmployee,
            searchType: loadedState.searchType
        })
    })

    it('should set chosen employee', () => {
        expect(reducer(loadedState, setChosenEmployee({
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@example.com',
            mobile: '555-555-5555',
            address: '123 Main St',
            contractType: 'Permanent',
            jobType: 'Part-Time',
            weeklyHours: 20,
            startDate: '2022-01-01',
            endDate: '',
        }))).toEqual({
            originalSource: loadedState.originalSource,
            modifiedSource: loadedState.modifiedSource,
            chosenEmployee: loadedState.chosenEmployee,
            searchType: loadedState.searchType
        })
    })
})