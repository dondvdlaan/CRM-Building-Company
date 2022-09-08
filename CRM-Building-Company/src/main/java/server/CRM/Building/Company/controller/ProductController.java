package server.CRM.Building.Company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Greeting;
import server.CRM.Building.Company.model.Product;
import server.CRM.Building.Company.model.Project;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProductRepository;
import server.CRM.Building.Company.repository.ProjectRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ProductController {

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

    @Autowired // This means to get the bean called productRepository
    private ProductRepository productRepository;

    // ------------- Routes -------------
    // Show all products
    @CrossOrigin(origins = "http://localhost:3000")  // Only accessible form REACT
    @GetMapping("/allProducts")
    public @ResponseBody List<Product>getAllProducts(){

        System.out.println("allProducts");
        List<Product> products = new ArrayList<>();
        productRepository.findAll().forEach(products::add);
        products.toString();

        return products;
    }

}
