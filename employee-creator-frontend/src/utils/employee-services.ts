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

export default deleteThisEmployee

export {getAllEmployees, deleteThisEmployee}