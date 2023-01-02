package server.CRM.Building.Company.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import server.CRM.Building.Company.model.User;
import server.CRM.Building.Company.repository.UserRepository;
import server.CRM.Building.Company.security.CustomUserDetails;

@Service
public class UserService  implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Find user by username
     * @param username [String] : Authentication in the UserController will call this
     *                            method
     * @return user [UserDetails] : User details for Authentication to check credentials
     */
    @Override
    public UserDetails loadUserByUsername(String username) {

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }
}