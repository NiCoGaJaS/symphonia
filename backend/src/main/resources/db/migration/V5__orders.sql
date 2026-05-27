CREATE TABLE orders
(
    id                     UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    customer_id            UUID REFERENCES accounts (id) ON DELETE CASCADE,

    shipping_first_name    TEXT        NOT NULL,
    shipping_last_name     TEXT        NOT NULL,
    shipping_city          TEXT        NOT NULL,
    shipping_postal_code   TEXT        NOT NULL,
    shipping_street        TEXT        NOT NULL,
    shipping_house_number  TEXT        NOT NULL,

    payment_account_holder TEXT        NOT NULL,
    payment_iban           TEXT        NOT NULL,

    billing_first_name     TEXT,
    billing_last_name      TEXT,
    billing_city           TEXT,
    billing_postal_code    TEXT,
    billing_street         TEXT,
    billing_house_number   TEXT,

    CONSTRAINT billing_address_all_or_none CHECK (
        (billing_first_name IS NULL AND
         billing_last_name IS NULL AND
         billing_city IS NULL AND
         billing_postal_code IS NULL AND
         billing_street IS NULL AND
         billing_house_number IS NULL)
            OR
        (billing_first_name IS NOT NULL AND
         billing_last_name IS NOT NULL AND
         billing_city IS NOT NULL AND
         billing_postal_code IS NOT NULL AND
         billing_street IS NOT NULL AND
         billing_house_number IS NOT NULL)
        )
);

CREATE TABLE order_items
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID           NOT NULL REFERENCES orders (id) ON DELETE CASCADE,

    name        VARCHAR(255)   NOT NULL,
    price       NUMERIC(10, 2) NOT NULL,
    summary     TEXT           NOT NULL,
    description TEXT           NOT NULL,
    category    CATEGORY       NOT NULL
);

CREATE TABLE order_item_images
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id    UUID NOT NULL REFERENCES order_items (id) ON DELETE CASCADE,
    url              TEXT NOT NULL,
    alternative_text TEXT NOT NULL    DEFAULT ''
);