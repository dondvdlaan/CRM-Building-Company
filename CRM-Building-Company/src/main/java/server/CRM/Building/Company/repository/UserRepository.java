package server.CRM.Building.Company.repository;

import org.springframework.data.repository.CrudRepository;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.User;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called UserRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {

}
