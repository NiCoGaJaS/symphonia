package de.nicogajas.backend.product.order;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.security.authentication.Account;
import org.jspecify.annotations.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Embedded;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Table("orders")
public record Order(
        @Id UUID id,
        @ReadOnlyProperty @Column("created_at") Instant createdAt,
        @Nullable @Column("customer_id") AggregateReference<Account, UUID> customer,
        @Embedded.Empty(prefix = "shipping_") Address shipping,
        @Embedded.Empty(prefix = "payment_") PaymentDetails payment,
        @Embedded.Nullable(prefix = "billing_") Address billing,
        @MappedCollection(idColumn = "order_id") Set<Item> products
) {
    
    public record Address(
            @Column("first_name") String firstName,
            @Column("last_name") String lastName,
            String city,
            String zipcode,
            String street,
            @Column("house_number") String houseNumber
    ) {}
    
    public record PaymentDetails(
            @Column("account_holder") String accountHolder,
            String iban
    ) {}
    
    @Table("order_items")
    public record Item(
            @Id UUID id,
            String name,
            BigDecimal price,
            int amount,
            String summary,
            String description,
            Product.Category category,
            @MappedCollection(idColumn = "order_item_id") Image image
    ) {
        
        @Table("order_item_images")
        public record Image(
                @Id UUID id,
                String url,
                @Column("alternative_text") String alternativeText
        ) {
            
            public Image(String url, String alternativeText) {
                this(null, url, alternativeText);
            }
            
        }
        
        
        public Item(
                String name, BigDecimal price, int amount, String summary, String description,
                Product.Category category,
                Image image
        ) {
            this(null, name, price, amount, summary, description, category, image);
        }
        
    }
    
    
    public Order(
            AggregateReference<Account, UUID> customer, Address shipping, PaymentDetails payment, Address billing,
            Set<Item> products
    ) {
        this(null, null, customer, shipping, payment, billing, products);
    }
    
}
