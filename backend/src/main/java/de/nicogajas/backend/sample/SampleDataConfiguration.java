package de.nicogajas.backend.sample;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.Role;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("sample-data")
public class SampleDataConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(SampleDataConfiguration.class);
    
    
    @Bean
    public ApplicationRunner fillProducts(Products products) {
        return _ -> {
            List<Product> sampleProducts = List.of(
                    new Product(
                            "Fender Player II Strat RW BCG",
                            new BigDecimal("772.00"),
                            "Vielseitige Stratocaster mit modernem Halsprofil und klassischem Fender-Sound.",
                            """
                            Die Fender Player II Strat RW BCG bietet den vertrauten Strat-Ton mit klaren Höhen, \
                            direkter Ansprache und hohem Spielkomfort. Das moderne C-Halsprofil, das \
                            Palisandergriffbrett und die drei Single-Coils machen sie zur flexiblen \
                            Wahl für Clean, Blues, Pop und druckvolle Rock-Sounds.\
                            """,
                            Product.Category.GUITAR,
                            new Product.Image(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg",
                                    "Fender Player II Strat RW BCG - Front"
                            )
                    ),
                    new Product(
                            "Martin Guitar 00028",
                            new BigDecimal("4499.00"),
                            "Premium-Akustikgitarre mit ausgewogenem Klangbild und edler Verarbeitung.",
                            """
                            Die Martin Guitar 00028 steht fuer einen warmen, detailreichen Akustikklang mit \
                            ausgezeichneter Dynamik. Ihre kompakte 000-Bauform liefert ein \
                            ausbalanciertes Ansprechverhalten fuer Fingerstyle und Strumming, \
                            waehrend hochwertige Tonhoelzer und die klassische Martin-Verarbeitung \
                            den professionellen Anspruch unterstreichen. \
                            """,
                            Product.Category.GUITAR,
                            new Product.Image(
                                    "https://fast-images.static-thomann.de/pics/bdb/_60/605644/20167029_800.jpg",
                                    "Martin Guitar 00028 - Front"
                            )
                    ),
                    new Product(
                            "Vox AC30 Handwired",
                            new BigDecimal("2299.00"),
                            "Handverdrahteter Roehrencombo mit offenem Top-Boost-Sound und viel Charakter.",
                            """
                            Der Vox AC30 Handwired liefert den legendaeren britischen Chime mit reichlich \
                            Headroom, harmonischer Saettigung und dynamischer Reaktion auf das \
                            Spielgefuehl. Ideal fuer Gitarristinnen und Gitarristen, die \
                            charakterstarke Clean-Sounds, offene Crunch-Texturen und klassische \
                            Vintage-Voicings suchen.\
                            """,
                            Product.Category.EXTRA,
                            new Product.Image(
                                    "https://bdbo2.thomann.de/thumb/bdb3000/pics/bdbo/20718091.jpg",
                                    "Vox AC30 Handwired - Front"
                            )
                    ),
                    new Product(
                            "Seymour Duncan SSL-5 Custom Staggered",
                            new BigDecimal("89.00"),
                            "Leistungsstarker Single-Coil fuer mehr Output, Praesenz und sustainreiche Leads.",
                            """
                            Der Seymour Duncan SSL-5 Custom Staggered ist ein beliebter Strat-Ersatzpickup \
                            mit kraeftigem Mittenbild, fokussierten Hoehen und deutlich mehr Druck \
                            als ein klassischer Vintage-Single-Coil. Er eignet sich besonders fuer \
                            singende Leads, durchsetzungsfaehige Rhythmusparts und moderne \
                            Rock-Setups.\
                            """,
                            Product.Category.EXTRA,
                            new Product.Image(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_17/172711/14519744_800.jpg",
                                    "Seymour Duncan SSL-5 Custom Staggered - Front"
                            )
                    )
            );
            
            if (products.count() == 0) {
                logger.info("No products found. Inserting {} sample products.", sampleProducts.size());
                List<Product> saved = products.saveAll(sampleProducts);
                logger.info("Successfully inserted {} sample products.", saved.size());
            } else {
                logger.info("Skipping sample products insertion because products already exist.");
            }
        };
    }
    
    
    @Bean
    public ApplicationRunner fillAccounts(Accounts accounts, PasswordEncoder encoder) {
        return _ -> {
            List<Account> demoAccounts = List.of(
                    new Account("admin@symphonia.com", encoder.encode("1234"), Role.ADMIN),
                    new Account("customer@symphonia.com", encoder.encode("1234"), Role.CUSTOMER)
            );
            
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
