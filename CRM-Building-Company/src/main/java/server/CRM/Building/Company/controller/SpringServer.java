package server.CRM.Building.Company.controller;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Greeting;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProductRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

@RestController
public class SpringServer {

    // Testing
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
    // End Testing

    // ------------- Constants -------------
    @Autowired // This means to get the bean called customerRepository
    private CustomerRepository customerRepository;

    @Autowired // This means to get the bean called projectRepository
    private ProjectRepository projectRepository;

    // ------------- Routes -------------
    // Show all customers
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @RequestMapping("/allCustomers")
    public @ResponseBody Iterable getAllCustomers(){

        System.out.println("allCustomers");
        return customerRepository.findAll();
    }
    // Get customer
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @GetMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable Integer id){

        Optional<Customer> customer = customerRepository.findById(id);
        System.out.println("getCustomer");
        return customer.get();
    }
    // Delete customer
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @DeleteMapping("/customer/{id}")
    public void deleteCustomer(@PathVariable Integer id){

        System.out.println("deleteCustomer");
        customerRepository.deleteById(id);
    }
    // Update customer
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @PutMapping("/customer/{id}")
    public void updateCustomer(@RequestBody Customer customer, @PathVariable Integer id){

        // Not to change original parameter customer
        Customer updatedCustomer = customer;

        updatedCustomer.setCustID(id);

        System.out.println("updateCustomer");
        customerRepository.save(updatedCustomer);
    }
    // Add Customer
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @PostMapping("/customer")
    public void addCustomer(@RequestBody Customer customer){

        System.out.println("addCustomer");
        customerRepository.save(customer);
    }
    // Show all projects
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible form REACT
    @RequestMapping("/allProjects")
    public @ResponseBody Iterable getAllProjects(){

        System.out.println("allProjects");
        return projectRepository.findAll();
    }

    // Testing
    // Show customer by lastname
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @RequestMapping("/custLastName")
    public @ResponseBody Iterable getLastName(@RequestParam(value = "name", defaultValue = "World") String name){

        System.out.println("getLastName");
        return customerRepository.findBycustLastName(name);
    }
    // END Testing
}
