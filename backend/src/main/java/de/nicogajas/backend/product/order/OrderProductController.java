package de.nicogajas.backend.product.order;

import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Account;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/products")
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
    
    
    @PostMapping("/order")
    @Transactional
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
    
    
    public record OrderDetailResponse(
            UUID id,
            Timestamp timestamp,
            Address shipping,
            @Nullable Address billing,
            Payment payment,
            List<Product> products
    ) {
        
        public static OrderDetailResponse from(Order order) {
            return new OrderDetailResponse(
                    order.id(),
                    Timestamp.from(order.createdAt()),
                    Address.from(order.shipping()),
                    order.billing() != null ? Address.from(order.billing()) : null,
                    Payment.from(order.payment()),
                    order.products().stream()
                            .map(Product::from)
                            .toList()
            );
        }
        
        
        public record Address(
                String firstName,
                String lastName,
                String city,
                String zipcode,
                String street,
                String houseNumber
        ) {
            
            public static Address from(Order.Address address) {
                return new Address(
                        address.firstName(),
                        address.lastName(),
                        address.city(),
                        address.zipcode(),
                        address.street(),
                        address.houseNumber()
                );
            }
            
        }
        
        public record Payment(
                String holder,
                String iban
        ) {
            
            public static Payment from(Order.PaymentDetails payment) {
                return new Payment(
                        payment.accountHolder(),
                        payment.iban()
                );
            }
            
        }
        
        public record Product(
                UUID id,
                String name,
                BigDecimal price,
                int amount,
                Image image
        ) {
            
            public static Product from(Order.Item item) {
                return new Product(
                        item.id(),
                        item.name(),
                        item.price(),
                        item.amount(),
                        Image.from(item.image())
                );
            }
            
            
            public record Image(
                    UUID id,
                    String url,
                    String alternativeText
            ) {
                
                public static Image from(Order.Item.Image image) {
                    return new Image(
                            image.id(),
                            image.url(),
                            image.alternativeText()
                    );
                }
                
            }
            
        }
        
    }
    
    
    @GetMapping("/order/{id}")
    public ResponseEntity<OrderDetailResponse> orderDetails(
            @PathVariable UUID id,
            Authentication authentication
    ) {
        Account account = Account.fromAuthentication(authentication);
        if (account == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        
        Order order = orders.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        
        if (order.customer() == null || !order.customer().getId().equals(account.id())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        
        return ResponseEntity.ok(OrderDetailResponse.from(order));
    }
    
    
    public record OrderListResponse(
            UUID id,
            Timestamp timestamp,
            int price
    ) {
        
        public static OrderListResponse from(Order order) {
            int totalPrice = order.products().stream()
                    .map(item -> item.price().multiply(BigDecimal.valueOf(item.amount())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .multiply(BigDecimal.valueOf(100))
                    .intValueExact();
            
            return new OrderListResponse(
                    order.id(),
                    Timestamp.from(order.createdAt()),
                    totalPrice
            );
        }
        
    }
    
    
    @GetMapping("/orders")
    public Page<OrderListResponse> orderList(
            Authentication authentication,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Account account = Account.fromAuthentication(authentication);
        
        if (account == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        
        List<Order> allOrders = orders.findAllByCustomer(account.id());
        
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), allOrders.size());
        
        List<Order> pageContent;
        if (start >= allOrders.size()) {
            pageContent = List.of();
        } else {
            pageContent = allOrders.subList(start, end);
        }
        
        Page<Order> page = new PageImpl<>(pageContent, pageable, allOrders.size());
        return page.map(OrderListResponse::from);
    }
    
}
