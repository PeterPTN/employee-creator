package peter.employeecreatorapi.employees;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	@Query("SELECT MAX(e.id) FROM Employee e")
	Long lastUsedId();
}
