package de.nicogajas.backend.product;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Products extends ListCrudRepository<Product, UUID> {
  @Query("""
        SELECT p FROM products p
        WHERE LOWER(regexp_replace(p.name, '[^a-z0-9]', ''))
        LIKE LOWER(CONCAT('%', regexp_replace(:query, '[^a-z0-9]', ''), '%'))
        LEFT JOIN FETCH product_images
    """)
    List<Product> filter(@Param("query") String query);
}
