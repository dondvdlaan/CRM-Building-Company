package server.CRM.Building.Company.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.repository.AddressRepository;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class CustomerController {

    // ------------- Constants -------------
    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
    @Autowired // This means to get the bean called customerRepository
    private CustomerRepository customerRepository;

    @Autowired // This means to get the bean called projectRepository
    private ProjectRepository projectRepository;

    @Autowired // This means to get the bean called addressRepository
    private AddressRepository addressRepository;

    // ------------- Routes -------------
    // Testing
    @GetMapping("/testing")
    public List<Map<String,Object>> test1(){
        return customerRepository.findProjectsByCust();
    }
    // End Testing

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
    public void updateCustomer(@RequestBody Customer updateCustomer, @PathVariable Integer id){

        System.out.println("updateCustomer");
        System.out.println("updateCustomer: " + updateCustomer.toString());

        customerRepository.findById(id)
                .map(customer -> {
                            customer.setCustFirstName(updateCustomer.getCustFirstName());
                            customer.setCustLastName(updateCustomer.getCustLastName());
                            customer.setCustEmail(updateCustomer.getCustEmail());
                            customer.setCustTel(updateCustomer.getCustTel());
                            customer.setCustAddress(updateCustomer.getCustAddress());
                    System.out.println("customer: " + customer.toString());

                    return customerRepository.save(customer);
                });

    }

    // Add Customer
    @PostMapping("/customer")
    public Customer addCustomer(@RequestBody Customer customer){

        System.out.println("addCustomer");
        System.out.println("Customer: " + customer.toString());

        // Create new customer
        Customer newCustomer = new Customer();
        newCustomer = customer;

        // Set registration date
        newCustomer.setCustRegistrationDate(LocalDate.now());

        // Create new address and save
        Address newAddress = new Address();
        newAddress = customer.getCustAddress();
        Address newAddressSaved = addressRepository.save(newAddress);

        // Add address to new customer
        newCustomer.setCustAddress(newAddressSaved);

        System.out.println("newCustomer: " + newCustomer.toString());


        return customerRepository.save(newCustomer);
    }


}
