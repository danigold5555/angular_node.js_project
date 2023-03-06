const cartItemsDal = require("../dal/cart-items-dal");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function addProductToCustomerCart(addedProductDetails) {
    validateAddedProductDetails(addedProductDetails)
    let existCartProduct = await cartItemsDal.checkIfCartProductExist(addedProductDetails);
    await existCartProduct.map(product => {
        if (product.productId == addedProductDetails.id) {
            throw new ServerError(ErrorType.PRODUCT_ALREADY_EXIST);
        }
    })
    await cartItemsDal.addProductToCustomerCart(addedProductDetails);
}

async function getCustomerCartItems(customerCartObject) {
validateCustomerCartObject(customerCartObject)
let customerCartItems = await cartItemsDal.getCustomerCartItems(customerCartObject);
return customerCartItems
}

async function deleteCartItem(deletedCartProductId,cartId) {
validateDeletedCartProductObject(deletedCartProductId,cartId)
await cartItemsDal.deleteCartItem(deletedCartProductId,cartId)
}

async function clearCustomerCart(cartId) {
if (!cartId) {
    throw new ServerError(ErrorType.INVALID_CART_ID);   
}
await cartItemsDal.clearCustomerCart(cartId)
}

function validateDeletedCartProductObject(deletedCartProductId,cartId) {
    if(!deletedCartProductId || !cartId){
        throw new ServerError(ErrorType.INVALID_PRODUCT_ID);   
    }
}

function validateCustomerCartObject(customerCartObject) {
    if (!customerCartObject.customerId || !customerCartObject.cartId) {
        throw new ServerError(ErrorType.MISSING_CUSTOMER_PARAMETERS);   
    }
}

function validateAddedProductDetails(addedProductDetails) {
    if (!addedProductDetails.cartId || !addedProductDetails.id || !addedProductDetails.quantity || !addedProductDetails.totalPrice) {
        throw new ServerError(ErrorType.MISSING_PRODUCT_DETAILS);
    }
}

module.exports = {
    addProductToCustomerCart,
    getCustomerCartItems,
    deleteCartItem,
    clearCustomerCart
}