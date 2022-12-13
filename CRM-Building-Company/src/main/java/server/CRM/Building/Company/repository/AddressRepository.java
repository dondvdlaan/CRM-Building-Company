package server.CRM.Building.Company.repository;

import org.springframework.data.repository.CrudRepository;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Customer;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called AddressRepository
// CRUD refers Create, Read, Update, Delete

public interface AddressRepository extends CrudRepository<Address, Integer> {

}
