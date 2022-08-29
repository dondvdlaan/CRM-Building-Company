package server.CRM.Building.Company.repository;

import org.springframework.data.repository.CrudRepository;
import server.CRM.Building.Company.model.Project;

// This will be AUTO IMPLEMENTED by Spring into a Bean called ProjectRepository
// CRUD refers Create, Read, Update, Delete

public interface ProjectRepository extends CrudRepository<Project, Integer> {

}
