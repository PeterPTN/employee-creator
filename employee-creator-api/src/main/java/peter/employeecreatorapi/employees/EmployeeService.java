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

	public Optional<Employee> updateById(Long id, UpdateEmployeeDto data) {
		Optional<Employee> maybeEmployee = this.employeeRepository.findById(id);
		if (maybeEmployee.isEmpty()) {
			return maybeEmployee;
		}

		Employee existingEmployee = maybeEmployee.get();
		mapper.map(data, existingEmployee);

		// Return this optional and run save
		return Optional.of(this.employeeRepository.save(existingEmployee));
	}

	public boolean deleteEmployeeById(Long id) {
		Optional<Employee> maybeEmployee = this.employeeRepository.findById(id);
		if (maybeEmployee.isEmpty()) {
			return false;
		}

		this.employeeRepository.delete(maybeEmployee.get());
		return true;
	}
}
