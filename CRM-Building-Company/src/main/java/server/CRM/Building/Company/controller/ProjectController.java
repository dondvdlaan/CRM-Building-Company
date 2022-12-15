package server.CRM.Building.Company.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Project;
import server.CRM.Building.Company.repository.AddressRepository;
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

    @Autowired
    private AddressRepository addressRepository;

    // ------------- Routes -------------
    // Show all projects
    @GetMapping("/allProjects")
    public  List<Project> getAllProjects(){

        System.out.println("Route: allProjects");
        /**
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll().forEach(projects::add);
        //projects.toString();

        return projects;
         */
        return projectRepository.findByOrderByProjForecastOrderDateAsc();
    }

    // Get project by id
    @GetMapping("/project/{id}")
    public Project getProject(@PathVariable Integer id){

        System.out.println("getProject");

        Project returnProject = new Project();

        Optional<Project> project = projectRepository.findById(id);

        if(project.isPresent()) returnProject = project.get();

        return returnProject;
    }
    // Add Project
    @PostMapping("/customer/{custID}/project")
    public void addProject(@PathVariable Integer custID, @RequestBody Project project){

        System.out.println("addProject");
        System.out.println("project " + project);



        // Create new project
        Project newProject = new Project();
        newProject = project;
        // Add customer to project
        customerRepository.findById(custID).ifPresent(newProject::setProjCustomer);

        // Create and get address
        Address projAddress = new Address();
        projAddress = project.getProjAddress();

        // Save address and add to project
        newProject.setProjAddress(addressRepository.save(projAddress));

        projectRepository.save(newProject);
    }
    // Update Project
    @PutMapping("/customer/{custID}/project")
    public void updateProject(@PathVariable Integer custID, @RequestBody Project project){

        System.out.println("updateProject");
        /**
        Optional<Customer>customer = customerRepository.findById(custID);
        Customer temp = new Customer();
        if(customer.isPresent()){
            temp = customer.get();
        }


        project.setCustomer(temp);
         */

        // Add customer to project
        customerRepository.findById(custID).ifPresent(project::setProjCustomer);

        projectRepository.save(project);
    }
    // Delete project
    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable Integer id){

        System.out.println("deleteProject");
        projectRepository.deleteById(id);
    }
}
