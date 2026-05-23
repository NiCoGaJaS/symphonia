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
        String summary,
        String description,
        Category category,
        @MappedCollection(idColumn = "product_id") Image image
) {

    public enum Category {
        GUITAR,
        PIANO,
        DRUMS,
        VINYL,
        EXTRA,
        OTHER
    }


    @Table("product_images")
    public record Image(
            @Id UUID id,
            String url,
            @Column("alternative_text") String alternativeText
    ) {

        public Image(String url, String alternativeText) {
            this(null, url, alternativeText);
        }

    }

    public Product(
            String name, BigDecimal price, String summary, String description, Category category, Image image
    ) {
        this(null, null, name, price, summary, description, category, image);
    }
    
}
