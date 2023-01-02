package server.CRM.Building.Company.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.helper.Helper;
import server.CRM.Building.Company.model.User;
import server.CRM.Building.Company.repository.UserRepository;
import server.CRM.Building.Company.service.TokenService;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    // ------------- Constants -------------
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    private final TokenService tokenService;

    public UserController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    // ------------- Routes -------------

    @PostMapping("/token")
    public String token(Authentication authentication) {

        System.out.println("Route: token");
        System.out.println("authentication: " + authentication);

        LOG.debug("Token requested for user: '{}'", authentication.getName());
        System.out.println("Token requested for user: " + authentication.getName());

        String token = tokenService.generateToken(authentication);

        LOG.debug("Token granted: {}", token);

        return token;
    }

    // Check User Login details
    @PostMapping("/logIn")
    public  boolean checkUserLogin(@RequestBody User user){

        System.out.println("Route: checkUserLogin");


        // *** Constants and variables ***
        boolean verifyLogIn = false;
        /*

        Optional<User> currentUser = Optional.ofNullable(userRepository.findByuserEmail(user.getUserEmail()));
        System.out.println("User: "+ currentUser.toString());

        if (currentUser.isPresent()){
            verifyLogIn = Helper.verifyPassword(user.getUserPW(),currentUser.get().getUserPW());
        }
        else System.out.println("Email not found");
        */
        return verifyLogIn;
    }

    // testing
    @GetMapping("/hello")
    public String testing(){

        System.out.println("Route: testing");

        return "Holita";
    }
    // end testing
}
