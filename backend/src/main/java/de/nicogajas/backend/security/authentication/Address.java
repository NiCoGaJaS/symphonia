package de.nicogajas.backend.security.authentication;

import org.springframework.data.relational.core.mapping.Column;

public record Address(
        @Column("first_name") String firstName,
        @Column("last_name") String lastName,
        String city,
        @Column("postal_code") String postalCode,
        String street,
        @Column("house_number") String houseNumber
) {}
