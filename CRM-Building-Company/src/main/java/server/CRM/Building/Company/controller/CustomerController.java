package server.CRM.Building.Company.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

@RestController
@CrossOrigin
public class CustomerController {

    // ------------- Constants -------------
    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
    @Autowired // This means to get the bean called customerRepository
    private CustomerRepository customerRepository;

    @Autowired // This means to get the bean called projectRepository
    private ProjectRepository projectRepository;

    // ------------- Routes -------------
    // Show all customers
    @GetMapping("/allCustomers")
    public Iterable getAllCustomers(){

        System.out.println("allCustomers");
        return customerRepository.findAll();
    }
    // Get customer
    @GetMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable Integer id) throws Exception{

        System.out.println("getCustomer");

        Customer  customer = customerRepository
                            .findById(id)
                            .orElseThrow(()->
                                    new Exception("Customer ID: " + id + " not found"));

        //Optional<Customer> customer = customerRepository.findById(id);

        return customer;
    }
    // Delete customer
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer id){

        System.out.println("deleteCustomer");
        customerRepository.deleteById(id);

        log.info("Logging " + ResponseEntity.noContent().build());
        return ResponseEntity.noContent().build();
    }
    // Update customer
    @PutMapping("/customer/{id}")
    public void updateCustomer(@RequestBody Customer customer, @PathVariable Integer id){

        // Not to change original parameter customer
        Customer updatedCustomer = customer;

        updatedCustomer.setCustID(id);

        System.out.println("updateCustomer");
        customerRepository.save(updatedCustomer);
    }
    // Add Customer
    @PostMapping("/customer")
    public Customer addCustomer(@RequestBody Customer customer){

        System.out.println("addCustomer");

        return customerRepository.save(customer);
    }

    // Testing
    // Show customer by lastname
    @RequestMapping("/custLastName")
    public @ResponseBody Iterable getLastName(@RequestParam(value = "name", defaultValue = "World") String name){

        System.out.println("getLastName");
        return customerRepository.findBycustLastName(name);
    }
    // END Testing
}
