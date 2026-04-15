package de.nicogajas.backend.product;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("product_images")
public record ProductImage(
        @Id UUID id,
        String url,
        @Column("alternative_text") String alternativeText
) {}
