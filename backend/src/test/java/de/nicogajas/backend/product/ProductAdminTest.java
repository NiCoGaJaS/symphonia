package de.nicogajas.backend.product;

import de.nicogajas.backend.product.admin.ProductAdminController;
import de.nicogajas.backend.security.SecurityConfig;
import de.nicogajas.backend.security.authentication.Accounts;

import java.io.InputStream;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import io.minio.MinioClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
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
    ProductImages productImages;
    
    @MockitoBean
    Accounts accounts;
    
    @MockitoBean
    private MinioClient minioClient;
    
    
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
    @WithMockUser(roles = "ADMIN")
    void createProductFromRequestBody() throws Exception {
        
        MockMultipartFile requestPart = new MockMultipartFile(
                "product",
                "product.json",
                MediaType.APPLICATION_JSON_VALUE,
                """
                {
                  "name": "Fender Player II Strat RW BCG",
                  "category": "GUITAR",
                  "price": 772.00,
                  "summary": "Short Description",
                  "description": "Description"
                }
                """.getBytes()
        );
        
        MockMultipartFile image = new MockMultipartFile(
                "image",
                "fender.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "image-content".getBytes()
        );
        
        mvc.perform(
                multipart("/api/admin/products/create")
                        .file(requestPart)
                        .file(image)
                        .with(csrf())
        )
                .andExpect(status().isCreated());
        
        verify(productImages).upload(
                argThat(name -> name.endsWith(".jpg")),
                any(InputStream.class),
                eq((long) "image-content".getBytes().length),
                eq(MediaType.IMAGE_JPEG_VALUE)
        );
        
        verify(products).save(
                argThat(
                        product -> product.id() == null
                                && product.name().equals("Fender Player II Strat RW BCG")
                                && product.category() == Product.Category.GUITAR
                                && product.price().compareTo(new BigDecimal("772.00")) == 0
                                && product.summary().equals("Short Description")
                                && product.description().equals("Description")
                                && product.image().id() == null
                                && product.image().url().startsWith("/public/")
                                && product.image().url().endsWith(".jpg")
                                && product.image().alternativeText().endsWith(".jpg")
                )
        );
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
