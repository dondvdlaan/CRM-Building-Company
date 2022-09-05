package server.CRM.Building.Company.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Greeting;
import server.CRM.Building.Company.model.Project;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProductRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

@RestController
public class ProjectController {

    // Testing
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting1")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
    // End Testing

    // ------------- Constants -------------
    @Autowired // This means to get the bean called customerRepository
    private CustomerRepository customerRepository;

    @Autowired // This means to get the bean called projectRepository
    private ProjectRepository projectRepository;

    @Autowired // This means to get the bean called productRepository
    private ProductRepository productRepository;

    // ------------- Routes -------------
    // Show all projects
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible form REACT
    @GetMapping("/allProjects")
    public @ResponseBody Iterable getAllProjects(){

        System.out.println("allProjects");
        List<Project> projects = new ArrayList<>();
        projects = projectRepository.findAll();
        projects.toString();

        return projects;
    }

    // Get project
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @GetMapping("/project/{id}")
    public Project getProject(@PathVariable Integer id){

        Optional<Project> project = projectRepository.findById(id);
        System.out.println("getProject");
        return project.get();
    }
    // Add Project
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @PostMapping("/customer/{custID}/project")
    public void addProject(@PathVariable Integer custID, @RequestBody Project project){

        Optional<Customer>customer = customerRepository.findById(custID);
        Customer temp = new Customer();
        if(customer.isPresent()){
             temp = customer.get();
        }


        project.setCustomer(temp);
        System.out.println("CustID " + custID);
        System.out.println("temp " + temp.toString());
        System.out.println(customer.toString());
        System.out.println(project.toString());

        System.out.println("addProject");

        projectRepository.save(project);
    }
    // Update Project
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible from REACT
    @PutMapping("/customer/{custID}/project")
    public void updateProject(@PathVariable Integer custID, @RequestBody Project project){

        System.out.println("updateProject");
        Optional<Customer>customer = customerRepository.findById(custID);
        Customer temp = new Customer();
        if(customer.isPresent()){
            temp = customer.get();
        }


        project.setCustomer(temp);
        System.out.println("CustID " + custID);
        System.out.println("temp " + temp.toString());
        System.out.println(customer.toString());
        System.out.println(project.toString());



        projectRepository.save(project);
    }
}
