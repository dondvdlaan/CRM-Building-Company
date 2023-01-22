package server.CRM.Building.Company.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import server.CRM.Building.Company.model.Customer;

import java.util.List;
import java.util.Map;

// This will be AUTO IMPLEMENTED by Spring into a Bean called CustomerRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer> {

    List<Customer> findBycustLastName(String name);

    @Query(
            value = "Select p from project p, customer c where c.custid = custID",
            nativeQuery = true
    )
    List<Map<String, Object>> findProjectsByCust();
}
