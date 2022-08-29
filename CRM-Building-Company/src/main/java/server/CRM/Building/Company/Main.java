package server.CRM.Building.Company;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.repository.CustomerRepository;

import java.util.Optional;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	public CommandLineRunner demo(CustomerRepository repository) {
		return (args) -> {
			//save a few customers
			/**
			repository.save(new Customer("Jack", "Bauer"));
			repository.save(new Customer("Chloe", "O'Brian"));
			repository.save(new Customer("Kim", "Bauer"));
			repository.save(new Customer("David", "Palmer"));
			repository.save(new Customer("Michelle", "Dessler"));
			*/
			// fetch all customers
			System.out.println("Customers found with findAll():");
			System.out.println("-------------------------------");
			for (Customer customer : repository.findAll()) {
				System.out.println(customer.toString());
			}
			System.out.println("");

			// fetch an individual customer by ID
			Optional<Customer> customer = repository.findById(2);
			System.out.println("Customer found with findById(1L):");
			System.out.println("--------------------------------");
			System.out.println(customer.toString());
			System.out.println("");

			// fetch customers by last name
			System.out.println("Customer found with findByLastName('Bauer'):");
			System.out.println("--------------------------------------------");
			repository.findBycustLastName("Bauer").forEach(bauer -> {
				System.out.println(bauer.toString());
			});
			System.out.println("");
		};
	}
}
