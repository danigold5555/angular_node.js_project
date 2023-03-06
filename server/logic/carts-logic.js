const cartsDal = require("../dal/carts-dal");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");


async function createCustomerCart(customerDetails) {
    validateCustomerDetails(customerDetails)
    let isCartIdExist = await cartsDal.getCustomerCartId(customerDetails.customerId);
    if (isCartIdExist) {
        throw new ServerError(ErrorType.INVALID_CART_ID);
    }
    await cartsDal.createCustomerCart(customerDetails);
    let createdCustomerCartId = await cartsDal.getCustomerCartId(customerDetails.customerId);
    return createdCustomerCartId.id
}

function validateCustomerDetails(customerDetails) {
    if (!customerDetails.customerId) {
        throw new ServerError(ErrorType.MISSING_CUSTOMER_PARAMETERS);
    }

    if (!customerDetails.currentDate) {
        throw new ServerError(ErrorType.MISSING_CUSTOMER_PARAMETERS);
    }
}







module.exports = {
    createCustomerCart
}