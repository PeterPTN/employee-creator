import { describe, vi, beforeEach, expect, it } from 'vitest'
import { Employee } from '../lib/Employee'
import { getAllEmployees, deleteEmployee } from './employee-services'

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

function createDeleteResponse(data: Employee[]) {
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

  it("makes a GET request of employees and returns it", async () => {
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

  it("makes a DELETE request of an employee and returns it", async () => {

  })
})

