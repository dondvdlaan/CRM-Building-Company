package server.CRM.Building.Company.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Customer;
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
    public  Iterable<Project> getAllProjects(){

        System.out.println("Route: allProjects");
        /**
        List<Project> projects = new ArrayList<>();
        projectRepository.findAll().forEach(projects::add);
        //projects.toString();

        return projects;
         */
        //return projectRepository.findAll();
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
    // Get projects by customer id
    @GetMapping("/customer/{custID}/projects")
    public List<Project> getProjectsByCustID(@PathVariable Integer custID) throws Exception{

        System.out.println("getProjectsByCustID");

        Customer customer = customerRepository
                .findById(custID)
                .orElseThrow(()->
                        new Exception("Customer ID: " + custID + " not found"));

        return projectRepository.findByCustomerOrderByProjForecastOrderDateAsc(customer);
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
        customerRepository.findById(custID).ifPresent(newProject::setCustomer);

        // Create and get address
        Address projAddress = new Address();
        projAddress = project.getProjAddress();

        // Save address and add to project
        newProject.setProjAddress(addressRepository.save(projAddress));

        projectRepository.save(newProject);
    }
    // Update Project
    @PutMapping("/customer/{custID}/project")
    public ResponseEntity<Object> updateProject(@PathVariable Integer custID, @RequestBody Project project){

        System.out.println("updateProject");

        Optional<Project> projectOptional = projectRepository.findById(project.getProjID());

        if (projectOptional.isEmpty())
            return ResponseEntity.notFound().build();
        else {
            // Add customer to project
            customerRepository.findById(custID).ifPresent(project::setCustomer);

            // Save project
            projectRepository.save(project);

            return ResponseEntity.noContent().build();
        }
    }
    // Delete project
    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable Integer id){

        System.out.println("deleteProject");
        projectRepository.deleteById(id);
    }
}
