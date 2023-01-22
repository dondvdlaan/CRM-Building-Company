package server.CRM.Building.Company.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Revenues;
import server.CRM.Building.Company.model.User;
import server.CRM.Building.Company.repository.RevenueRepository;
import server.CRM.Building.Company.repository.UserRepository;
import server.CRM.Building.Company.security.SecurityConfiguration;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository repositoryUSR, RevenueRepository revenueRepository) {

        return args -> {
            //Address newAddress = new Address();
            //System.out.println(newAddress);

            /**
            User user1 = new User();
            user1.setUsername("Patito Duck");
            user1.setUserEmail("admin@admin.com");
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String password = "password";
            String encodedPassword = passwordEncoder.encode(password);
            user1.setPassword(encodedPassword);

            log.info("Preloading " + repositoryUSR.save(user1));

            Revenues jan2022 = new Revenues(100,
                    LocalDate.of(2022, 1, 15),1);
            Revenues feb2022 = new Revenues(200,
                    LocalDate.of(2022, 2, 15),2);
            Revenues mar2022 = new Revenues(150,
                    LocalDate.of(2022, 3, 15),3);
            Revenues apr2022 = new Revenues(250,
                    LocalDate.of(2022, 4, 15),3);
            Revenues may2022 = new Revenues(50,
                    LocalDate.of(2022, 5, 15),3);
            Revenues jun2022 = new Revenues(300,
                    LocalDate.of(2022, 6, 15),3);
            Revenues jul2022 = new Revenues(500,
                    LocalDate.of(2022, 7, 15),3);
            Revenues aug2022 = new Revenues(700,
                    LocalDate.of(2022, 8, 15),3);
            Revenues sep2022 = new Revenues(700,
                    LocalDate.of(2022, 9, 15),3);
            Revenues oct2022 = new Revenues(250,
                    LocalDate.of(2022, 10, 15),3);
            Revenues nov2022 = new Revenues(360,
                    LocalDate.of(2022, 11, 15),3);

            revenueRepository.save(jan2022);
            revenueRepository.save(feb2022);
            revenueRepository.save(mar2022);
            revenueRepository.save(apr2022);
            revenueRepository.save(may2022);
            revenueRepository.save(jun2022);
            revenueRepository.save(jul2022);
            revenueRepository.save(aug2022);
            revenueRepository.save(sep2022);
            revenueRepository.save(oct2022);
            revenueRepository.save(nov2022);
*/
        };
    }
}
