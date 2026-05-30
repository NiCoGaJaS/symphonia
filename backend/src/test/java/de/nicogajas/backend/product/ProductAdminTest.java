package de.nicogajas.backend.product;

import de.nicogajas.backend.product.admin.ProductAdminController;
import de.nicogajas.backend.security.SecurityConfig;
import de.nicogajas.backend.security.authentication.Accounts;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProductAdminController.class)
@Import(SecurityConfig.class)
public class ProductAdminTest {
    
    @Autowired
    MockMvc mvc;
    
    @MockitoBean
    Products products;
    
    @MockitoBean
    Accounts accounts;
    
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void getAdminProducts() throws Exception {
        Product.Image image = new Product.Image(
                UUID.randomUUID(),
                "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg",
                "Fender Player II Strat RW BCG - Front"
        );
        
        Product fender = new Product(
                UUID.randomUUID(),
                Instant.now(),
                "Fender Player II Strat RW BCG",
                new BigDecimal("772.00"),
                "Short Description",
                "Description",
                Product.Category.OTHER,
                image
        );
        
        Page<Product> page = new PageImpl<>(List.of(fender));
        
        when(products.findAll(any(Pageable.class))).thenReturn(page);
        
        mvc.perform(get("/api/admin/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].id").value(fender.id().toString()))
                .andExpect(jsonPath("$.content[0].name").value(fender.name()))
                .andExpect(jsonPath("$.content[0].category").value(fender.category().name()))
                .andExpect(jsonPath("$.content[0].price").value(fender.price().doubleValue()))
                .andExpect(jsonPath("$.content[0].image.id").value(image.id().toString()))
                .andExpect(jsonPath("$.content[0].image.url").value(image.url()))
                .andExpect(jsonPath("$.content[0].image.alternative_text").value(image.alternativeText()));
    }
    
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteProductAndReturnNoContent() throws Exception {
        UUID id = UUID.randomUUID();
        
        mvc.perform(delete("/api/admin/products/{id}", id).with(csrf()))
                .andExpect(status().isNoContent());
        
        verify(products).deleteById(id);
    }
    
    
    @Test
    @WithMockUser(roles = "CUSTOMER")
    void getAdminProductsIsForbiddenForCustomer() throws Exception {
        mvc.perform(get("/api/admin/products"))
                .andExpect(status().isForbidden());
    }
    
    
    @Test
    @WithMockUser(roles = "CUSTOMER")
    void deleteProductIsForbiddenForCustomer() throws Exception {
        UUID id = UUID.randomUUID();
        mvc.perform(delete("/api/admin/products/{id}", id))
                .andExpect(status().isForbidden());
    }
    
}
