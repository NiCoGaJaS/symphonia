package de.nicogajas.backend.sample;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.Role;

import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Configuration
@Profile("sample-data")
public class SampleDataConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(SampleDataConfiguration.class);
    
    
    @Bean
    public ApplicationRunner fillProducts(Products products, ObjectMapper json) {
        return _ -> {
            if (products.count() > 0) {
                logger.info("Skipping sample products insertion because products already exist.");
                return;
            }
            logger.info("No products found. Inserting sample products.");
            try (InputStream stream = new ClassPathResource("db/sample-products.json").getInputStream()) {
                List<Product> sampleProducts;
                sampleProducts = json.readValue(stream, new TypeReference<List<Product>>() {});
                List<Product> saved = products.saveAll(sampleProducts);
                logger.info("Successfully inserted {} sample products.", saved.size());
            } catch (Exception e) {
                logger.info("Could not insert sample products" + e);
            }
        };
    }
    
    
    @Bean
    public ApplicationRunner fillAccounts(Accounts accounts, PasswordEncoder encoder) {
        return _ -> {
            List<Account> demoAccounts = List.of(
                    new Account("admin@symphonia.com", encoder.encode("1234"), Role.ADMIN),
                    new Account("customer@symphonia.com", encoder.encode("1234"), Role.CUSTOMER));
            
            if (accounts.count() == 0) {
                logger.info("No accounts found. Inserting {} demo accounts.", demoAccounts.size());
                List<Account> saved = accounts.saveAll(demoAccounts);
                logger.info("Successfully inserted {} demo accounts.", saved.size());
            } else {
                logger.info("Skipping demo accounts insertion because accounts already exist.");
            }
        };
    }
    
}
