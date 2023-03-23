import { CreateEmployee } from "../lib/CreateEmployee";
import { Employee } from "../lib/Employee";

const getAllEmployees = async () => {
    const response = await Promise.race([
        fetch('http://localhost:8080/employees'),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )]) as Response;

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

const deleteEmployee = async (id: number) => {
    const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error("Couldn't find employee with id: " + id);
    }

    return true;
}

const createEmployee = async (employeeData: CreateEmployee) => {
    const response = await fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error('failed to create an employee');
    }

    return true;
};

const updateEmployee = async (employeeData: Employee) => {
    const response = await fetch(`http://localhost:8080/employees/${employeeData.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
        throw new Error("Couldn't find employee with id: " + employeeData.id);
    }

    return true;
}

const populateFormWithEmployeeData = (setValue: any, employeeData: CreateEmployee) => {
    const employeeEntries = Object.entries(employeeData);
    
    employeeEntries.forEach((entry) => {
        setValue(entry[0], entry[1]);
    })
}

const formatDateToAusStandard = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

export {getAllEmployees, deleteEmployee, createEmployee, updateEmployee, populateFormWithEmployeeData, formatDateToAusStandard}