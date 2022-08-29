package server.CRM.Building.Company.repository;

import org.springframework.data.repository.CrudRepository;
import server.CRM.Building.Company.model.Product;

// This will be AUTO IMPLEMENTED by Spring into a Bean called ProductRepository
// CRUD refers Create, Read, Update, Delete

public interface ProductRepository extends CrudRepository<Product, Integer> {

}
