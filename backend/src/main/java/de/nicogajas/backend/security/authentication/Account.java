package de.nicogajas.backend.security.authentication;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;

@Table("accounts")
public record Account(
        @Id UUID id,
        @ReadOnlyProperty @Column("created_at") Instant createdAt,
        String email,
        String password,
        Role role
) implements UserDetails {
    
    @Override
    public @NonNull Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_%s".formatted(role.name())));
    }
    
    
    @Override
    public @NonNull String getUsername() {
        return email;
    }
    
    
    @Override
    public @Nullable String getPassword() {
        return password;
    }
    
    
    public static Account fromAuthentication(Authentication authentication) {
        Account account = (Account) authentication.getPrincipal();
        
        if (account == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in.");
        }
        
        return account;
    }
    
}
