const letters = /^[a-zA-Z\s.-]+$/;
const addressNumber = /^[0-9a-zA-Z/-]+$/;
const zipcode = /^\d{5}$/;

export const orderPatterns = {
    street: letters,
    city: letters,
    number: addressNumber,
    zipcode: zipcode,
};
