package server.CRM.Building.Company.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Project;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called ProjectRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {

    List<Project> findByOrderByProjForecastOrderDateAsc();


    List<Project> findByCustomerOrderByProjForecastOrderDateAsc(Customer customer);
}
