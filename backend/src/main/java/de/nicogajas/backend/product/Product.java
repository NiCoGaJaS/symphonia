package de.nicogajas.backend.product;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

@Table("products")
public record Product(
        @Id UUID id,
        @ReadOnlyProperty @Column("created_at") Instant createdAt,
        String name,
        BigDecimal price,
        @MappedCollection(idColumn = "product_id") ProductImage image
) {}
