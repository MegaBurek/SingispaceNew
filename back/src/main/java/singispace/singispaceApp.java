package singispace;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import singispace.config.AppProperties;
import singispace.domain.User;
import singispace.service.UserAccService;


@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class singispaceApp extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(singispaceApp.class, args);

    }


}

