const ordersDal = require("../dal/orders-dal");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");



async function countAllOrders() {
    let ordersQuantity = await ordersDal.countAllOrders();
    if (!ordersQuantity) {
        throw new ServerError(ErrorType.INVALID_ORDERS_COUNT);
    }
    return ordersQuantity
}

async function getAllShipmentsDates() {
    let allShipmentsDates = await ordersDal.getAllShipmentsDates();
    return allShipmentsDates
}

async function createNewCustomerOrder(customerOrderDetails) {
    validateCustomerOrderDetails(customerOrderDetails)
    let numberOfShipmentsInSelectedDate = await ordersDal.countNumberOfShipmentsInSelectedDate(customerOrderDetails.shipmentDate);
    if (numberOfShipmentsInSelectedDate >= 3){
        throw new ServerError(ErrorType.SHIPMENT_DATE_IS_FULL);
    }
    let creditCardLastFourDigits = getCreditCardLastFourDigits(customerOrderDetails.creditCard);
    customerOrderDetails.creditCard = creditCardLastFourDigits;
    await ordersDal.closeActiveCustomerCart(customerOrderDetails.customerId, customerOrderDetails.cartId);
    await ordersDal.createNewCustomerOrder(customerOrderDetails);
}

function validateCustomerOrderDetails(customerOrderDetails) {
    let cityNamePattern = new RegExp("[a-zA-Z][a-zA-Z \-]{2,}$");
    let streetNamePattern = new RegExp("[a-zA-Z][a-zA-Z0-9  \-]{2,}$");
    let creditNumberPattern = new RegExp("[0-9][0-9 ]{7,17}$");

    if (!customerOrderDetails.customerId || !customerOrderDetails.cartId || !customerOrderDetails.finalPrice || !customerOrderDetails.shipmentDate || !customerOrderDetails.orderDate || !customerOrderDetails.cityName || !customerOrderDetails.streetName || !customerOrderDetails.creditCard) {
        throw new ServerError(ErrorType.MISSING_ORDER_DETAILS);
    }

    if (cityNamePattern.test(customerOrderDetails.cityName) === false) {
        throw new ServerError(ErrorType.INVALID_CHOSEN_CITY_PATTERN);
    }

    if (streetNamePattern.test(customerOrderDetails.streetName) === false) {
        throw new ServerError(ErrorType.INVALID_STREET_PATTERN);
    }

    if (creditNumberPattern.test(customerOrderDetails.creditCard) === false) {
        throw new ServerError(ErrorType.INVALID_CREDIT_CARD_PATTERN);
    }
}

function getCreditCardLastFourDigits(creditCardNumber) {
    let customerCreditCardNumberString = creditCardNumber.toString();
    var lastFourDigits = customerCreditCardNumberString.substr(customerCreditCardNumberString.length - 4);
    return lastFourDigits
}










module.exports = {
    countAllOrders,
    getAllShipmentsDates,
    createNewCustomerOrder
}