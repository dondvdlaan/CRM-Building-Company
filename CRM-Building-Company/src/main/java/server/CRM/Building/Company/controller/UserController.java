package server.CRM.Building.Company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.helper.Helper;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Greeting;
import server.CRM.Building.Company.model.User;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProductRepository;
import server.CRM.Building.Company.repository.ProjectRepository;
import server.CRM.Building.Company.repository.UserRepository;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    // ------------- Constants -------------
    @Autowired
    private UserRepository userRepository;

    // ------------- Routes -------------
    // Check User Login details
    @PostMapping("/logIn")
    public  boolean checkUserLogin(@RequestBody User user){

        System.out.println("Route: checkUserLogin");

        // *** Constants and variables ***
        boolean verifyLogIn = false;

        Optional<User> currentUser = Optional.ofNullable(userRepository.findByuserEmail(user.getUserEmail()));
        System.out.println("User: "+ currentUser.toString());

        if (currentUser.isPresent()){
            verifyLogIn = Helper.verifyPassword(user.getUserPW(),currentUser.get().getUserPW());
        }
        else System.out.println("Email not found");

        return verifyLogIn;
    }

}
