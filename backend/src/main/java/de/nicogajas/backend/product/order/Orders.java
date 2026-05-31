package de.nicogajas.backend.product.order;

import java.util.List;
import java.util.UUID;

import de.nicogajas.backend.security.authentication.Account;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Orders extends ListCrudRepository<Order, UUID> {
    @Query("""
        SELECT * 
        FROM orders 
        WHERE customer_id = :customerId 
        ORDER BY created_at DESC
        """)
    List<Order> findAllByCustomer(UUID customerId);
}
