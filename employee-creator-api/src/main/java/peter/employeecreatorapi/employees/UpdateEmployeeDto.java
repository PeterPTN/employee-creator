package peter.employeecreatorapi.employees;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateEmployeeDto {
	// Essentially an optional column to change	
	@Size(min = 1)
	private String firstName;
	
	@Size(min = 1)
	private String middleName;
	
	@Size(min = 1)
	private String lastName;
	
	@Email
	@Size(min = 1)
	private String email;
	
	@Pattern(regexp="[0-9]+")
	@Size(min=10)
	// Specifies one or more digits, no @Size needed
	private String  mobile;
	
	@Size(min = 1)
	private String address;
	
	@Size(min = 1)
	private String contractType;
	
	@Size(min = 1)
	private String jobType;
	
	@Min(0)
	private Integer weeklyHours;
	
	@Past
	@NotNull
	private LocalDate startDate;
	
	@NotNull
	private LocalDate endDate;
}
