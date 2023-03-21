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

const deleteThisEmployee = async (id: number) => {
    const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error("Couldn't find post with id " + id);
    }

    return true;
}

const createEmployee = async (employeeData: Employee) => {
    console.log(employeeData)

    const response = await fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      console.log(await response.json());
      throw new Error('failed to create an employee');
    }

    return await response.json();
};


export {getAllEmployees, deleteThisEmployee, createEmployee}