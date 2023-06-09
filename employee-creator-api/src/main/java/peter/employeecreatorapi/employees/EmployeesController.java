package peter.employeecreatorapi.employees;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import peter.employeecreatorapi.employees.exception.NotFoundException;

@RestController
@RequestMapping("/employees")
public class EmployeesController {

	@Autowired
	private EmployeeService employeeService;

	@PostMapping
	public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDto data) {
		Employee createdEmployee = this.employeeService.createEmployee(data);
		return new ResponseEntity<Employee>(createdEmployee, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Employee>> findAllEmployees() {
		List<Employee> employeeList = this.employeeService.findAllEmployees();
		return new ResponseEntity<>(employeeList, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) {
		Employee foundEmployee = this.findEmployeeOrThrow(id);
		return new ResponseEntity<Employee>(foundEmployee, HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Employee> updateByEmployeeId(@PathVariable Long id,
			@Valid @RequestBody UpdateEmployeeDto data) {
		Employee foundEmployee = this.findEmployeeOrThrow(id);
		Employee updatedEmployee = this.employeeService.updateEmployee(foundEmployee, data);
		return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Employee> deleteEmployeeById(@PathVariable Long id) {
		Employee foundEmployee = this.findEmployeeOrThrow(id);
		this.employeeService.deleteEmployee(foundEmployee);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	private Employee findEmployeeOrThrow(Long id) {
		return this.employeeService.findEmployeeById(id)
				.orElseThrow(() -> new NotFoundException("Could not find Employee with id: " + id));
	}
}
