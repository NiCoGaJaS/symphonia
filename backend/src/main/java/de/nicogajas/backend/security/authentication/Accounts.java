package de.nicogajas.backend.security.authentication;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Accounts extends ListCrudRepository<Account, UUID> {
    
    Optional<Account> findByEmail(String email);
    boolean existsByEmail(String email);
    
    @Modifying
    @Query("""
           UPDATE accounts
           SET first_name = :firstName,
               last_name = :lastName
           WHERE id = :id
           """)
    void setName(UUID id, String firstName, String lastName);
    
    @Modifying
    @Query("""
           UPDATE accounts
           SET payment_holder = :holder,
               payment_iban = :iban
           WHERE id = :id
           """)
    void setPayment(UUID id, String holder, String iban);
    
    @Modifying
    @Query("""
           UPDATE accounts
           SET shipping_first_name   = :firstName,
               shipping_last_name    = :lastName,
               shipping_city         = :city,
               shipping_postal_code  = :postalCode,
               shipping_street       = :street,
               shipping_house_number = :houseNumber
           WHERE id = :id
           """)
    void setShipping(
            UUID id,
            String firstName,
            String lastName,
            String city,
            String postalCode,
            String street,
            String houseNumber
    );
    
    @Modifying
    @Query("""
           UPDATE accounts
           SET billing_first_name   = :firstName,
               billing_last_name    = :lastName,
               billing_city         = :city,
               billing_postal_code  = :postalCode,
               billing_street       = :street,
               billing_house_number = :houseNumber
           WHERE id = :id
           """)
    void setBilling(
            UUID id,
            String firstName,
            String lastName,
            String city,
            String postalCode,
            String street,
            String houseNumber
    );
    
}
