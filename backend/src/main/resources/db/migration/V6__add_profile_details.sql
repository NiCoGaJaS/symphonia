ALTER TABLE accounts
    ADD COLUMN first_name TEXT,
    ADD COLUMN last_name  TEXT,
    ADD CONSTRAINT name_all_or_none
        CHECK (
            (first_name IS NULL AND last_name IS NULL)
                OR
            (first_name IS NOT NULL AND last_name IS NOT NULL)
            );

ALTER TABLE accounts
    ADD COLUMN payment_holder TEXT,
    ADD COLUMN payment_iban   TEXT,
    ADD CONSTRAINT payment_details_all_or_none
        CHECK (
            (payment_holder IS NULL AND payment_iban IS NULL)
                OR
            (payment_holder IS NOT NULL AND payment_iban IS NOT NULL)
            );

ALTER TABLE accounts
    ADD COLUMN shipping_first_name   TEXT,
    ADD COLUMN shipping_last_name    TEXT,
    ADD COLUMN shipping_city         TEXT,
    ADD COLUMN shipping_zipcode      TEXT,
    ADD COLUMN shipping_street       TEXT,
    ADD COLUMN shipping_house_number TEXT,
    ADD CONSTRAINT shipping_address_all_or_none
        CHECK (
            (shipping_first_name IS NULL AND
             shipping_last_name IS NULL AND
             shipping_city IS NULL AND
             shipping_zipcode IS NULL AND
             shipping_street IS NULL AND
             shipping_house_number IS NULL)
                OR
            (shipping_first_name IS NOT NULL AND
             shipping_last_name IS NOT NULL AND
             shipping_city IS NOT NULL AND
             shipping_zipcode IS NOT NULL AND
             shipping_street IS NOT NULL AND
             shipping_house_number IS NOT NULL)
            );

ALTER TABLE accounts
    ADD COLUMN billing_first_name   TEXT,
    ADD COLUMN billing_last_name    TEXT,
    ADD COLUMN billing_city         TEXT,
    ADD COLUMN billing_zipcode      TEXT,
    ADD COLUMN billing_street       TEXT,
    ADD COLUMN billing_house_number TEXT,
    ADD CONSTRAINT billing_address_all_or_none
        CHECK (
            (billing_first_name IS NULL AND
             billing_last_name IS NULL AND
             billing_city IS NULL AND
             billing_zipcode IS NULL AND
             billing_street IS NULL AND
             billing_house_number IS NULL)
                OR
            (billing_first_name IS NOT NULL AND
             billing_last_name IS NOT NULL AND
             billing_city IS NOT NULL AND
             billing_zipcode IS NOT NULL AND
             billing_street IS NOT NULL AND
             billing_house_number IS NOT NULL)
            );
