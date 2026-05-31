const letters = /^[\p{L}\s.-]+$/u;
const house_number = /^[0-9a-zA-Z/-]+$/;
const zipcode = /^\d{5}$/;
const iban = /^DE\d{2}(?:\s?\d{4}){4}\s?\d{2}$/;

export const PAYMENT_PATTERNS = {
    iban: iban,
};

export const ADDRESS_PATTERNS = {
    street: letters,
    city: letters,
    house_number: house_number,
    zipcode: zipcode,
};
