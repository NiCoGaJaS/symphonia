CREATE TABLE accounts
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    email   VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    role VARCHAR(8) NOT NULL DEFAULT 'CUSTOMER' CHECK (role in ('ADMIN', 'CUSTOMER'))
);