package de.nicogajas.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class BackendApplication {
    
    static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
    
}
