package de.nicogajas.backend.product;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Products extends ListCrudRepository<Product, UUID> {

    Page<Product> findAll(Pageable pageable);

    List<Product> findAllByNameContainsIgnoreCase(String name);

}
