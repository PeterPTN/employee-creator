package peter.employeecreatorapi.employee;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import peter.employeecreatorapi.TestConfig;
import peter.employeecreatorapi.employees.Employee;
import peter.employeecreatorapi.employees.EmployeeRepository;
import peter.employeecreatorapi.employees.EmployeeService;

@SpringBootTest(properties = "ec-base-url=http://localhost:8080", webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Import(TestConfig.class)
public class EmployeeControllerEndToEndTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Autowired
	private EmployeeRepository employeeRepository;

	private Employee john;
	private Employee jane;
	private static ObjectMapper objectMapper;

	@BeforeAll
	public static void config() {
		objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
	}

	@BeforeEach
	public void setup() {
		john = new Employee("John", "Doe", "Smith", "johndoe@example.com", "0431581851", "123 Main St", "Full-Time",
				"Manager", 40, LocalDate.parse("2022-01-01"), LocalDate.parse("2022-12-31"));
		jane = new Employee("Jane", "Marie", "Johnson", "janejohnson@example.com", "0435163481", "456 Elm St",
				"Part-Time", "Salesperson", 20, LocalDate.parse("2022-02-01"), LocalDate.parse("2022-05-31"));
		employeeRepository.save(john);
		employeeRepository.save(jane);
	}

	@AfterEach
	public void teardown() {
		employeeRepository.deleteAll();
	}

	@Nested
	class FindAllTests {


		@Test
		public void findAllEmployees_returnsAllEmployeesInDb() {
			ResponseEntity<String> response = restTemplate.getForEntity("/employees", String.class);
			assertEquals(HttpStatus.OK, response.getStatusCode());
			Employee[] employees = restTemplate.getForObject("/employees", Employee[].class);
			assertEquals(2, employees.length);
		}

		@Test
		public void findAllEmployee_returnsEmptyArrayWhenDbEmpty() {
			employeeRepository.deleteAll();
			ResponseEntity<String> response = restTemplate.getForEntity("/employees", String.class);
			assertEquals(HttpStatus.OK, response.getStatusCode());
			Employee[] employees = restTemplate.getForObject("/employees", Employee[].class);
			assertEquals(0, employees.length);
		}
	}

	@Nested
	class CreateTests {

		private HttpHeaders headers;

		@BeforeEach
		public void createHeaders() {
			headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
		}

		@Test
		public void createEmployee_persistsEmployeeInDbWhenPassedCorrectBody() {
			String requestBody = "{\"firstName\": \"Josh\", \"middleName\": null, \"lastName\": \"Fox\", \"email\": \"josh.fox@example.com\", \"mobile\": \"0412345678\", \"address\": \"123 Main Street\", \"contractType\": \"Full-Time\", \"jobType\": \"CEO\", \"weeklyHours\": 40, \"startDate\": \"2022-01-01\", \"endDate\": null}";
			long employeeCount = employeeRepository.count();
			HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
			restTemplate.postForEntity("/employees", entity, String.class);
			assertEquals(employeeCount + 1, employeeRepository.count());
		}

		@Test
		public void createEmployee_respondsWithCreatedEmployeeWhenPassedCorrectBody() throws JsonProcessingException {
			String requestBody = "{\"firstName\": \"Josh\", \"middleName\": null, \"lastName\": \"Fox\", \"email\": \"josh.fox@example.com\", \"mobile\": \"0412345678\", \"address\": \"123 Main Street\", \"contractType\": \"Full-Time\", \"jobType\": \"CEO\", \"weeklyHours\": 40, \"startDate\": \"2022-01-01\", \"endDate\": null}";
			Long lastId = employeeRepository.lastUsedId();
			HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
			ResponseEntity<String> response = restTemplate.postForEntity("/employees", entity, String.class);
			assertEquals(HttpStatus.CREATED, response.getStatusCode());
			String responseBody = response.getBody();
			System.out.println(responseBody);
			Employee employee = objectMapper.readValue(responseBody, Employee.class);
			assertEquals(lastId + 1, employee.getId());
			assertEquals("Josh", employee.getFirstName());
			assertEquals(null, employee.getMiddleName());
			assertEquals("Fox", employee.getLastName());
			assertEquals("josh.fox@example.com", employee.getEmail());
			assertEquals("0412345678", employee.getMobile());
			assertEquals("123 Main Street", employee.getAddress());
			assertEquals("Full-Time", employee.getContractType());
			assertEquals("CEO", employee.getJobType());
			assertEquals(40, employee.getWeeklyHours());
			assertEquals(LocalDate.parse("2022-01-01"), employee.getStartDate());
			assertEquals(null, employee.getEndDate());
		}

		@Test
		public void createEmployee_respondsWithBadRequestWhenPassedInvalidBody() throws JsonProcessingException {
			String requestBody = "{\"firstName\": \"\", \"middleName\": null, \"lastName\": \"Fox\", \"email\": \"josh.fox@example.com\", \"mobile\": \"0412345678\", \"address\": \"123 Main Street\", \"contractType\": \"Full-Time\", \"jobType\": \"CEO\", \"weeklyHours\": \"-10\", \"startDate\": \"2022-01-01\", \"endDate\": null}";

			HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
			ResponseEntity<String> response = restTemplate.postForEntity("/employees", entity, String.class);
			assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

			JsonNode responseBody = objectMapper.readTree(response.getBody());
			assertTrue(responseBody.has("errors"));

			JsonNode errorsNode = responseBody.get("errors");
			assertTrue(errorsNode.isObject());

			JsonNode nameError = errorsNode.get("firstName");
			assertNotNull(nameError);
			assertTrue(nameError.isArray());
			assertEquals(1, nameError.size());
			assertEquals("must not be blank", nameError.get(0).asText());

			JsonNode weeklyHoursError = errorsNode.get("weeklyHours");
			assertNotNull(weeklyHoursError);
			assertTrue(weeklyHoursError.isArray());
			assertEquals(1, weeklyHoursError.size());
			assertEquals("must be greater than or equal to 0", weeklyHoursError.get(0).asText());
		}
	}
}