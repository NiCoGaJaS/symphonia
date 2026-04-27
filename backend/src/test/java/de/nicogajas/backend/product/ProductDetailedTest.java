package de.nicogajas.backend.product;

import de.nicogajas.backend.product.detail.ProductDetailController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductDetailController.class)
public class ProductDetailedTest {

    @Autowired
    MockMvc mvc;

    @MockitoBean
    Products products;

    @Test
    void getProductById() throws Exception {
        ProductImage image = new ProductImage(
                UUID.randomUUID(),
                "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg",
                "Fender Player II Strat RW BCG - Front");

        UUID id = UUID.randomUUID();

        Product fender = new Product(
                id,
                Instant.now(),
                "Fender Player II Strat RW BCG",
                new BigDecimal("772.00"),
                "Short Description",
                "Description",
                image);

        when(products.findById(id)).thenReturn(Optional.of(fender));

        mvc.perform(get("/api/products/{id}", id))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.id").value(fender.id().toString()),
                        jsonPath("$.name").value(fender.name()),
                        jsonPath("$.price").value(fender.price().doubleValue()),
                        jsonPath("$.short_description").value(fender.shortDescription()),
                        jsonPath("$.description").value(fender.description()),
                        jsonPath("$.image.id").value(fender.image().id().toString()),
                        jsonPath("$.image.url").value(fender.image().url()),
                        jsonPath("$.image.alternative_text").value(fender.image().alternativeText()));
    }


}
