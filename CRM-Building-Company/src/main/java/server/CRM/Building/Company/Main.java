package server.CRM.Building.Company;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Project;
import server.CRM.Building.Company.model.User;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProjectRepository;
import server.CRM.Building.Company.repository.UserRepository;
import server.CRM.Building.Company.security.RsaKeyProperties;

import java.util.Optional;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	public CommandLineRunner demo(ProjectRepository repositoryPRJ,
								  CustomerRepository repositoryCTM,
								  UserRepository repositoryUSR) {


		return (args) -> {
			//save a few projects
			//Project project =new Project("TestProject", "TestDetails");
			//Customer customer = (new Customer("TestName","TestLastNmae","a@bbb.ccc"));

			//project.setCustomer(customer);

			//repositoryPRJ.save(project);
			/**
			User user1 = new User();
			user1.setUserFirstName("Patito");
			user1.setUserLastName("Duck");
			user1.setUserEmail("admin@admin.com");
			user1.setUserPW("b3fbcdbc8517f4d08017f2752145ce52a216bd6d1ea197a2483139fe42eb30a15cf387404b227cb622f3d5968b4dd90c96e297c72fd97a7f8cc093d8915706ef");

			repositoryUSR.save(user1);
			 */

		};
	}
}
