package de.nicogajas.backend.cart;

import de.nicogajas.backend.product.Category;
import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.ProductImage;
import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Accounts;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(CartValidationController.class)
public class CartValidationTest {
    
    @Autowired
    MockMvc mvc;
    
    @MockitoBean
    Products products;
    
    @MockitoBean
    Accounts accounts;
    
    
    @Test
    void returnsInvalidIds() throws Exception {
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
        
        UUID invalidId = UUID.randomUUID();
        
        when(products.findAllById(any())).thenReturn(List.of(fender, fenderToo));
        
        mvc.perform(post("/api/cart/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                         [
                           "%s",
                           "%s",
                           "%s"
                         ]
                         """.formatted(fender.id(), invalidId, fenderToo.id())))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.length()").value(1),
                        jsonPath("$[0]").value(invalidId.toString()));
    }
    
}
