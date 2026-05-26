package de.nicogajas.backend.security.authentication;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Accounts extends ListCrudRepository<Account, UUID> {
    
    Optional<Account> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
}
