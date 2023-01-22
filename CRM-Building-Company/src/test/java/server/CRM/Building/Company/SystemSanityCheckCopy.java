package server.CRM.Building.Company;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.web.client.TestRestTemplate;
import server.CRM.Building.Company.controller.CustomerController;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.repository.AddressRepository;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.assertj.core.api.Assertions.assertThat;

class SystemSanityCheckCopy {

	// *** Variables ***
	//@Autowired
	private CustomerController controller;
	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private TestEntityManager entityManager;

	@BeforeEach
	void setUp() {
		 controller = new CustomerController();
	}

	/**
	 * Sanity check test, that will fail if the application context cannot start
	 */
	@Test
	@DisplayName("Sanity check test")
	public void contextLoads() throws Exception {

		// assertion for controller
		assertThat(controller).isNotNull();
	}

	/**
	 * HTTP request test
	 */
	@Value(value="${local.server.port}")
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@RepeatedTest(2)
	@DisplayName("HTTP request test")
	public void ShowAllCustomersReturnsListOfCustomers() throws Exception {
		assertThat(this.restTemplate
				.getForObject("http://localhost:" + port + "/testing2",
				String.class)).contains("A ver q pasa!");
	}

	/**
	 * Model Address test
	 */
	@Test
	@DisplayName("Address Street name")
	public void whenFindByStreet_thenReturnAddress() {
		// given
		Address address = new Address("hauptstrasse",
								"167",
									"67472",
										"Esthal",
									"D");
		addressRepository.save(address);
		//entityManager.persist(address);
		//entityManager.flush();

		// when
		Address result = addressRepository.findAddressByAddressStreet(address.getAddressStreet());

		// then
		assertThat(result.getAddressStreet())
				.isEqualTo(address.getAddressStreet());
	}
}
