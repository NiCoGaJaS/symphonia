CREATE TABLE products
(
    id         UUID PRIMARY KEY        DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    name       VARCHAR(255)   NOT NULL,
    price      NUMERIC(10, 2) NOT NULL,
    shortDescription TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE product_images
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id       UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    url              TEXT NOT NULL,
    alternative_text TEXT NOT NULL    DEFAULT ''
);
