package server.CRM.Building.Company.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Project;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

@RestController
@CrossOrigin
public class ProjectController {

    // ------------- Constants -------------
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProjectRepository projectRepository;

    // ------------- Routes -------------
    // Show all projects
    @GetMapping("/allProjects")
    public  List<Project> getAllProjects(){

        System.out.println("Route: allProjects");
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll().forEach(projects::add);
        //projects.toString();

        return projects;
    }

    // Get project
    @GetMapping("/project/{id}")
    public Project getProject(@PathVariable Integer id){

        Optional<Project> project = projectRepository.findById(id);
        System.out.println("getProject");
        return project.get();
    }
    // Add Project
    @PostMapping("/customer/{custID}/project")
    public void addProject(@PathVariable Integer custID, @RequestBody Project project){

        System.out.println("addProject");
        //Optional<Customer>customer = customerRepository.findById(custID);

        customerRepository.findById(custID).ifPresent(customer->{
            //customer.setProject(project);
            project.setCustomer(customer);
        });

        System.out.println("CustID " + custID);
        System.out.println(project.toString());

        projectRepository.save(project);
    }
    // Update Project
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
    // Delete project
    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable Integer id){

        System.out.println("deleteProject");
        projectRepository.deleteById(id);
    }
}
