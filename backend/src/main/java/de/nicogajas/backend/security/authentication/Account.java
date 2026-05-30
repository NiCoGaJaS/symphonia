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
import org.springframework.data.relational.core.mapping.Embedded;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Table("accounts")
public record Account(
        @Id UUID id,
        @ReadOnlyProperty @Column("created_at") Instant createdAt,
        String email,
        String password,
        Role role,
        @Column("first_name") String firstName,
        @Column("last_name") String lastName,
        @Embedded.Nullable(prefix = "payment_") PaymentDetails payment,
        @Embedded.Nullable(prefix = "shipping_") Address shipping,
        @Embedded.Nullable(prefix = "billing_") Address billing
) implements UserDetails {
    
    public enum Role {
        ADMIN,
        CUSTOMER
    }
    
    public record PaymentDetails(
            @Column("holder") String holder,
            @Column("iban") String iban
    ) {}
    
    public record Address(
            @Column("first_name") String firstName,
            @Column("last_name") String lastName,
            String city,
            String zipcode,
            String street,
            @Column("house_number") String houseNumber
    ) {}
    
    
    public Account(String email, String password, Role role) {
        this(null, null, email, password, role, null, null, null, null, null);
    }
    
    
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
    
    
    public static @Nullable Account fromAuthentication(@Nullable Authentication authentication) {
        if (authentication == null) {
            return null;
        }
        
        return (Account) authentication.getPrincipal();
    }
    
}
