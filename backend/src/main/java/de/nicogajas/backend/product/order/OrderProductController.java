package de.nicogajas.backend.product.order;

import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Account;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
            @NotEmpty Set<Product> products,
            @NotNull Address shipping,
            @NotNull Payment payment,
            @Nullable Address billing
    ) {
        
        public record Product(
                UUID id,
                int amount
        ) {}
        
        public record Address(
                @NotBlank String firstName,
                @NotBlank String lastName,
                @NotBlank String city,
                @NotBlank String zipcode,
                @NotBlank String street,
                @NotBlank String houseNumber
        ) {
            
            public Order.Address toAddress() {
                return new Order.Address(
                        firstName.trim(),
                        lastName.trim(),
                        city.trim(),
                        zipcode.trim(),
                        street.trim(),
                        houseNumber.trim()
                );
            }
            
        }
        
        public record Payment(
                @NotBlank String holder,
                @NotBlank String iban
        ) {
            
            public Order.PaymentDetails toPaymentDetails() {
                return new Order.PaymentDetails(
                        holder.trim(),
                        iban.trim()
                );
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
                    items
            );
        }
        
    }
    
    
    @PostMapping
    public ResponseEntity<Void> order(@Valid @RequestBody OrderRequest request, Authentication authentication) {
        Account account = Account.fromAuthentication(authentication);
        
        Map<UUID, Integer> amountOf = request.products.stream()
                .collect(Collectors.toMap(OrderRequest.Product::id, OrderRequest.Product::amount));
        
        Set<Order.Item> items = products.findAllById(amountOf.keySet())
                .stream().map(
                        product -> new Order.Item(
                                product.name(),
                                product.price(),
                                amountOf.get(product.id()),
                                product.summary(),
                                product.description(),
                                product.category(),
                                new Order.Item.Image(
                                        product.image().url(),
                                        product.image().alternativeText()
                                )
                        )
                ).collect(Collectors.toSet());
        
        orders.save(request.toOrder(account, items));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
}
