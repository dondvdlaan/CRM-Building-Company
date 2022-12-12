package server.CRM.Building.Company.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import server.CRM.Building.Company.model.User;
import server.CRM.Building.Company.repository.UserRepository;

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository repositoryUSR) {

        return args -> {
            /**
            User user1 = new User();
            user1.setUserFirstName("Patito");
            user1.setUserLastName("Duck");
            user1.setUserEmail("admin@admin.com");
            user1.setUserPW("b3fbcdbc8517f4d08017f2752145ce52a216bd6d1ea197a2483139fe42eb30a15cf387404b227cb622f3d5968b4dd90c96e297c72fd97a7f8cc093d8915706ef");

            log.info("Preloading " + repositoryUSR.save(user1));
             */
        };
    }
}
