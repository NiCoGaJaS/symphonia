package de.nicogajas.backend.product;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface Products extends ListCrudRepository<Product, UUID> {

    List<Product> findAllByNameContainsIgnoreCase(String name);

}
