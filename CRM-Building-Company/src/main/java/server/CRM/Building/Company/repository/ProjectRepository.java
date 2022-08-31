package server.CRM.Building.Company.repository;

import org.springframework.data.repository.CrudRepository;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Project;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called ProjectRepository
// CRUD refers Create, Read, Update, Delete

public interface ProjectRepository extends CrudRepository<Project, Integer> {

    List<Customer> findByprojTitle(String name);
}
