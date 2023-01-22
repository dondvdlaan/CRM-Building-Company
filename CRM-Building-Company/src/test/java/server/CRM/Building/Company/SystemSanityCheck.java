package server.CRM.Building.Company;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import server.CRM.Building.Company.controller.CustomerController;

import static org.assertj.core.api.Assertions.assertThat;

class SystemSanityCheck {

	// *** Variables ***
	private CustomerController controller;

	@BeforeEach
	void setUp() {
		 controller = new CustomerController();
	}

	/**
	 * Sanity check test, with java org.assertj.core, that will fail if the
	 * application context cannot start
	 */
	@Test
	@DisplayName("Sanity check test")
	public void contextLoads() throws Exception {

		// assertion for controller
		assertThat(controller).isNotNull();
	}
}
