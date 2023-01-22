package server.CRM.Building.Company.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Customer;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called AddressRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface AddressRepository extends CrudRepository<Address, Integer> {

    Address findAddressByAddressStreet(String streetName);
}
