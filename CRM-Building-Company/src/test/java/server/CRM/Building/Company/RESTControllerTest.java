package server.CRM.Building.Company;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.repository.CustomerRepository;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RESTControllerTest {

	// *** Variables ***
	@MockBean
	private CustomerRepository repository;

	// MockMvc instance to simulate HTTP requests
	@Autowired
	MockMvc mockMvc;

	/**
	 * REST Controller test uses Spring @WebMvcTest, @MockBean, MockMvc, Mokito,
	 * and hamcrest.Matchers
	 */
	@Test
	@DisplayName("REST Controller test")
	public void controllerFindAllTest() throws Exception {

		// Create customer and add to list
		Customer customer1 = new Customer("Pluto", "Dog");
		Customer customer2 = new Customer("Mickey","Mouse");
		List<Customer> customers = Arrays.asList(customer1, customer2);

		// Mocking CustomerRepository
		when(repository.findAll()).thenReturn(customers);

		// When retrieving all Customers
		mockMvc.perform(get("/allCustomers"))

				// Then...
				.andExpect(status().isOk())
				.andDo(print())

				// ... check size of List and First name
				.andExpect(jsonPath("$", Matchers.hasSize(2)))
				.andExpect(jsonPath("$[0].custFirstName", Matchers.is("Pluto")));
	}
}
