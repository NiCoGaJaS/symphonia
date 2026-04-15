package de.nicogajas.backend.product;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Products extends ListCrudRepository<Product, UUID> {}
