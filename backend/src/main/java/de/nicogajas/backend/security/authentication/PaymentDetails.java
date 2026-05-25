package de.nicogajas.backend.security.authentication;

import org.springframework.data.relational.core.mapping.Column;

public record PaymentDetails(
        @Column("holder") String holder,
        @Column("iban") String iban
) {}
