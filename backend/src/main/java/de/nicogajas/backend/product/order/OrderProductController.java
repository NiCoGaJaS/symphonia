package de.nicogajas.backend.product.order;

import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Account;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products/order")
public class OrderProductController {
    
    private final Orders orders;
    private final Products products;
    
    
    @Autowired
    public OrderProductController(Orders orders, Products products) {
        this.orders = orders;
        this.products = products;
    }
    
    
    public record OrderRequest(
            Set<Product> products,
            Address shipping,
            Payment payment,
            @Nullable Address billing
    ) {
        
        public record Product(
                UUID id,
                int count
        ) {}
        
        public record Address(
                String firstName,
                String lastName,
                String city,
                String postalCode,
                String street,
                String houseNumber
        ) {
            
            public Order.Address toAddress() {
                return new Order.Address(
                        firstName,
                        lastName,
                        city,
                        postalCode,
                        street,
                        houseNumber);
            }
            
        }
        
        public record Payment(
                String holder,
                String iban
        ) {
            
            public Order.PaymentDetails toPaymentDetails() {
                return new Order.PaymentDetails(
                        holder,
                        iban);
            }
            
        }
        
        
        public Order toOrder(@Nullable Account account, Set<Order.Item> items) {
            AggregateReference<Account, UUID> customer = null;
            
            if (account != null) {
                customer = AggregateReference.to(account.id());
            }
            
            return new Order(
                    customer,
                    shipping.toAddress(),
                    payment.toPaymentDetails(),
                    billing == null ? null : billing.toAddress(),
                    items);
        }
        
    }
    
    
    @PostMapping
    public ResponseEntity<Void> order(@Valid @RequestBody OrderRequest request, Authentication authentication) {
        Account account = Account.fromAuthentication(authentication);
        
        Set<UUID> ids = request.products.stream().map(OrderRequest.Product::id).collect(Collectors.toSet());
        Set<Order.Item> items = products.findAllById(ids)
                .stream().map(product -> new Order.Item(
                        product.name(),
                        product.price(),
                        product.summary(),
                        product.description(),
                        product.category(),
                        new Order.Item.Image(
                                product.image().url(),
                                product.image().alternativeText())))
                .collect(Collectors.toSet());
        
        orders.save(request.toOrder(account, items));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
}
