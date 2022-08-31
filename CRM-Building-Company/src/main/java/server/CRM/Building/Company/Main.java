package server.CRM.Building.Company;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Project;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

import java.util.Optional;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	public CommandLineRunner demo(ProjectRepository repositoryPRJ,CustomerRepository repositoryCTM ) {
		return (args) -> {
			//save a few projects
			Project project =new Project("TestProject", "TestDetails");
			Customer customer = (new Customer("TestName","TestLastNmae"));

			project.setCustomer(customer);

			repositoryPRJ.save(project);







		};
	}
}
