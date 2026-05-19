const letters = /^[a-zA-Z\s.-]+$/;
const name = /^[a-zA-Z\s'-]+$/;
const addressNumber = /^[0-9a-zA-Z/-]+$/;
const zipcode = /^[0-9]{5}$/;

export const orderPatterns = {
    street: letters,
    city: letters,
    name: name,
    number: addressNumber,
    zipcode: zipcode,
};
