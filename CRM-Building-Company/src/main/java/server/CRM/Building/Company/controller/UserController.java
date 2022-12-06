package server.CRM.Building.Company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Greeting;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProductRepository;
import server.CRM.Building.Company.repository.ProjectRepository;
import server.CRM.Building.Company.repository.UserRepository;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@CrossOrigin
public class UserController {

    // ------------- Constants -------------
    @Autowired
    private UserRepository userRepository;

    // ------------- Routes -------------
    // Check User Login details
    @PostMapping("/logIn")
    public  Iterable checkUserLogin(){

        System.out.println("Route: checkUserLogin");
        return userRepository.findAll();
    }

}
