package peter.employeecreatorapi.employees;

import java.time.LocalDate;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateEmployeeDto {
	// Essentially @Size sets an optional column to change	
	@Size(min = 1)
	private String firstName;
	
	private String middleName;
	
	@Size(min = 1)
	private String lastName;
	
	@Email
	@Size(min = 1)
	private String email;
	
	@Pattern(regexp="[0-9]+")
	@Size(min=10)
	private String  mobile;
	
	@Size(min = 1)
	private String address;
	
	@Size(min = 1)
	private String contractType;
	
	@Size(min = 1)
	private String jobType;
	
	@Min(0)
	@Max(99)
	private Integer weeklyHours;
	
	@Past
	private LocalDate startDate;
	
	@Nullable
	private LocalDate endDate;
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public Integer getWeeklyHours() {
		return weeklyHours;
	}

	public void setWeeklyHours(Integer weeklyHours) {
		this.weeklyHours = weeklyHours;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	
	public String toString() {
		return this.firstName;
	}
}
