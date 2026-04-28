package de.nicogajas.backend.security.authentication;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Accounts extends CrudRepository<Account, UUID> {
    
    Optional<Account> findByEmail(String email);
    
}
