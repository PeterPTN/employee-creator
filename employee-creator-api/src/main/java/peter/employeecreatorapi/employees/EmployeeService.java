package peter.employeecreatorapi.employees;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private ModelMapper mapper;

	public Employee createEmployee(CreateEmployeeDto data) {
		Employee newEmployee = mapper.map(data, Employee.class);
		return this.employeeRepository.save(newEmployee);
	}

	public List<Employee> findAllEmployees() {
		return this.employeeRepository.findAll();
	}

	public Optional<Employee> findEmployeeById(Long id) {
		return this.employeeRepository.findById(id);
	}

	public Employee updateEmployee(Employee employee, UpdateEmployeeDto data) {
		mapper.map(data, employee);
		return this.employeeRepository.save(employee);
	}

	public void deleteEmployee(Employee employee) {
		this.employeeRepository.delete(employee);
	}
}
