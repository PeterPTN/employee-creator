import { describe, vi, beforeEach, expect, it } from 'vitest'
import { getAllEmployees, deleteEmployee, createEmployee, updateEmployee, formatDateToAusStandard } from './employee-services'
import { CreateEmployee } from '../lib/CreateEmployee';
import { Employee } from '../lib/Employee'

const mockFetch = vi.fn();
global.fetch = mockFetch;

function createFetchResponse(data: Employee[]) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
    status: 200,
    statusText: 'OK',
  }
}

function createDeleteResponse(number: number) {
  if (number === 1)
    return {
      json: () => new Promise((resolve) => resolve(true)),
      ok: true,
      status: 200,
      statusText: 'OK',
    }
}

function createPostResponse(data: CreateEmployee) {
  return {
    json: () => new Promise((resolve) => resolve(true)),
    ok: true,
    status: 200,
    statusText: 'OK',
  }
}

function createPatchResponse(data: Employee) {
  return {
    json: () => new Promise((resolve) => resolve(true)),
    ok: true,
    status: 200,
    statusText: 'OK',
  }
}

describe("Employee Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  })

  it("should make a GET request of employees and returns it", async () => {
    const employeesResponseBody: Employee[] = [
      {
        id: 1,
        firstName: 'Peter',
        middleName: "Thanh",
        lastName: "Nguyen",
        email: "fake@gmail.com",
        mobile: "5555555555",
        address: "123 Fake St",
        contractType: "Full-Time",
        jobType: "Developer",
        weeklyHours: 40,
        startDate: "01-01-2023"
      }
    ]

    mockFetch.mockResolvedValue(createFetchResponse(employeesResponseBody));
    const employeesArray = await getAllEmployees();
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/employees");
    expect(employeesArray).toStrictEqual(employeesResponseBody);
  })

  it("should make a DELETE request of an employee and returns true", async () => {
    mockFetch.mockResolvedValue(createDeleteResponse(1));
    const employeeHasBeenDeleted = await deleteEmployee(1);
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/employees/1", {
      method: 'DELETE'
    });
    expect(employeeHasBeenDeleted).toStrictEqual(true);
  })

  it('should make a POST request of an employee and returns true', async () => {
    const employeeData: CreateEmployee = {
      firstName: 'Peter',
      middleName: "Thanh",
      lastName: "Nguyen",
      email: "fake@gmail.com",
      mobile: "5555555555",
      address: "123 Fake St",
      contractType: "Full-Time",
      jobType: "Developer",
      weeklyHours: 40,
      startDate: "01-01-2023"
    };

    mockFetch.mockResolvedValue(createPostResponse(employeeData));
    const employeeCreated = await createEmployee(employeeData);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    expect(employeeCreated).toStrictEqual(true);
  })

  it('should make a PATCH request and update an employee', async () => {
    const employeeData = {
      id: 1,
      firstName: 'Johnny',
      middleName: "Bravo",
      lastName: "Nguyen",
      email: "fake@gmail.com",
      mobile: "5555555555",
      address: "123 Fake St",
      contractType: "Full-Time",
      jobType: "Developer",
      weeklyHours: 40,
      startDate: "01-01-2023"
    }

    mockFetch.mockResolvedValue(createPatchResponse(employeeData));
    const employeeUpdated = await updateEmployee(employeeData);
    expect(mockFetch).toHaveBeenCalledWith(`http://localhost:8080/employees/${employeeData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    expect(employeeUpdated).toStrictEqual(true);
  })
})

describe('Employee Utilities', () => {
  it('should convert ISO date format to AU standard', () => {
    expect(formatDateToAusStandard('2000-05-15')).toStrictEqual('15/05/2000');
  })
})

