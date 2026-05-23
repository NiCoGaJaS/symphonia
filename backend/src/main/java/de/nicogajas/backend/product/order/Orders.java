package de.nicogajas.backend.product.order;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface Orders extends ListCrudRepository<Order, UUID> {}
