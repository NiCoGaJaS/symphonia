package de.nicogajas.backend.product;

import de.nicogajas.backend.product.ids.ProductIdsController;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProductIdsController.class)
public class ProductIdsTest {
    
    @Autowired
    MockMvc mvc;
    
    @MockitoBean
    Products products;
    
    
    @Test
    void getAllProductIds() throws Exception {
        ProductImage image = new ProductImage(
                UUID.randomUUID(),
                "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg",
                "Fender Player II Strat RW BCG - Front");
        
        Product fender = new Product(
                UUID.randomUUID(),
                Instant.now(),
                "Fender Player II Strat RW BCG",
                new BigDecimal("772.00"),
                "Short Description",
                "Description",
                Category.OTHER,
                image);
        
        Product fenderToo = new Product(
                UUID.randomUUID(),
                Instant.now(),
                "Also a fender",
                new BigDecimal("2.00"),
                "Short Description",
                "Description",
                Category.OTHER,
                image);
        
        when(products.findAll()).thenReturn(List.of(fender, fenderToo));
        
        mvc.perform(get("/api/productIds"))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$[0]").value(fender.id().toString()),
                        jsonPath("$[1]").value(fenderToo.id().toString()));
    }
    
}
