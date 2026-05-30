package de.nicogajas.backend.product.order;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Orders extends ListCrudRepository<Order, UUID> {}
