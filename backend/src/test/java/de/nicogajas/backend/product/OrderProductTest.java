package de.nicogajas.backend.product;

import de.nicogajas.backend.product.order.Order;
import de.nicogajas.backend.product.order.OrderProductController;
import de.nicogajas.backend.product.order.Orders;
import de.nicogajas.backend.security.SecurityConfig;
import de.nicogajas.backend.security.authentication.Accounts;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

@WebMvcTest(OrderProductController.class)
@Import(SecurityConfig.class)
public class OrderProductTest {
    
    @Autowired
    MockMvc mvc;
    
    @Autowired
    ObjectMapper json;
    
    @MockitoBean
    Orders orders;
    
    @MockitoBean
    Products products;
    
    @MockitoBean
    Accounts accounts;
    
    
    private static Product fender() {
        Product.Image image = new Product.Image(
                UUID.randomUUID(),
                "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg",
                "Fender Player II Strat RW BCG - Front"
        );
        
        return new Product(
                UUID.randomUUID(),
                Instant.now(),
                "Fender Player II Strat RW BCG",
                new BigDecimal("772.00"),
                "Short Description",
                "Description",
                Product.Category.OTHER,
                image
        );
    }
    
    
    @Test
    void createOrderAndReturns201() throws Exception {
        Product fender = fender();
        when(products.findAllById(List.of(fender.id()))).thenReturn(List.of(fender));
        
        OrderProductController.OrderRequest request = new OrderProductController.OrderRequest(
                Set.of(new OrderProductController.OrderRequest.Product(fender.id(), 1)),
                new OrderProductController.OrderRequest.Address(
                        "Max",
                        "Mustermann",
                        "Musterstadt",
                        "12345",
                        "Musterstraße",
                        "1"
                ),
                new OrderProductController.OrderRequest.Payment(
                        "Max Mustermann",
                        "DE12 3456 7890 1234 5678 90"
                ),
                null
        );
        
        mvc.perform(
                post("/api/products/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isCreated());
        
        verify(orders).save(any(Order.class));
    }
    
    
    @Test
    void failWithEmptyOrder() throws Exception {
        OrderProductController.OrderRequest request = new OrderProductController.OrderRequest(
                Set.of(),
                new OrderProductController.OrderRequest.Address(
                        "Max",
                        "Mustermann",
                        "Musterstadt",
                        "12345",
                        "Musterstraße",
                        "1"
                ),
                new OrderProductController.OrderRequest.Payment(
                        "Max Mustermann",
                        "DE12 3456 7890 1234 5678 90"
                ),
                null
        );
        
        mvc.perform(
                post("/api/products/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
    }
    
    
    @Test
    void failWithEmptyAddress() throws Exception {
        Product fender = fender();
        OrderProductController.OrderRequest request = new OrderProductController.OrderRequest(
                Set.of(new OrderProductController.OrderRequest.Product(fender.id(), 1)),
                null,
                new OrderProductController.OrderRequest.Payment(
                        "Max Mustermann",
                        "DE12 3456 7890 1234 5678 90"
                ),
                null
        );
        
        mvc.perform(
                post("/api/products/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
    }
    
    
    @Test
    void failWithEmptyPaymentDetails() throws Exception {
        Product fender = fender();
        OrderProductController.OrderRequest request = new OrderProductController.OrderRequest(
                Set.of(new OrderProductController.OrderRequest.Product(fender.id(), 1)),
                new OrderProductController.OrderRequest.Address(
                        "Max",
                        "Mustermann",
                        "Musterstadt",
                        "12345",
                        "Musterstraße",
                        "1"
                ),
                null,
                null
        );
        
        mvc.perform(
                post("/api/products/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
    }
    
}
