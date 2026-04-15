CREATE TABLE products
(
    id         UUID PRIMARY KEY        DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    name       VARCHAR(255)   NOT NULL,
    price      NUMERIC(10, 2) NOT NULL
);

CREATE TABLE product_images
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id       UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    url              TEXT NOT NULL,
    alternative_text TEXT NOT NULL    DEFAULT ''
);


INSERT INTO products (name, price)
VALUES ('Fender Player II Strat RW BCG', 772.00),
       ('Martin Guitar 00028', 4499.00),
       ('Vox AC30 Handwired', 2299.00),
       ('Seymour Duncan SSL-5 Custom Staggered', 89.00);

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
       'Fender Player II Strat RW BCG - Front'
FROM products
WHERE name = 'Fender Player II Strat RW BCG';

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://fast-images.static-thomann.de/pics/bdb/_60/605644/20167029_800.jpg',
       'Martin Guitar 00028 - Front'
FROM products
WHERE name = 'Martin Guitar 00028';

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://bdbo2.thomann.de/thumb/bdb3000/pics/bdbo/20718091.jpg',
       'Vox AC30 Handwired - Front'
FROM products
WHERE name = 'Vox AC30 Handwired';

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_17/172711/14519744_800.jpg',
       'Seymour Duncan SSL-5 Custom Staggered - Front'
FROM products
WHERE name = 'Seymour Duncan SSL-5 Custom Staggered';
