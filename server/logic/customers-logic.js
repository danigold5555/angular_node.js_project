const customersDal = require("../dal/customers-dal");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');


async function signupCustomer(customerSignupDetails) {
    validateCustomerIdAndPassword(customerSignupDetails.idNumber, customerSignupDetails.password)
    validateCustomerDetails(customerSignupDetails)
    if (await customersDal.isCustomerIdExist(customerSignupDetails.idNumber)) {
        throw new ServerError(ErrorType.USER_ALREADY_EXISTS);
    }
    customerSignupDetails.password = encryptPassword(customerSignupDetails.password);
    if (customerSignupDetails.idNumber == '999999999') {
        customerSignupDetails.role = 'admin';
    }
    else {
        customerSignupDetails.role = 'customer';
    }
    await customersDal.signupCustomer(customerSignupDetails);
}

async function loginCustomer(customerLoginDetails) {
    validateCustomerIdAndPassword(customerLoginDetails.idNumber, customerLoginDetails.password);
    let customerId = await customersDal.isCustomerIdExist(customerLoginDetails.idNumber);
    if (!customerId) {
        throw new ServerError(ErrorType.INVALID_CUSTOMER_CREDENTIALS);
    }
    customerLoginDetails.password = encryptPassword(customerLoginDetails.password);
    let registeredCustomerPassword = await customersDal.getCustomerEncryptedPassword(customerLoginDetails.idNumber);
    if (registeredCustomerPassword == customerLoginDetails.password) {
        let customerFirstName = await customersDal.getCustomerFirstName(customerLoginDetails.idNumber);
        let customerToken = await createCustomerToken(customerLoginDetails, customerFirstName)
        return { successfulLoginResponse: 'Bearer ' + customerToken }
    }
    else {
        throw new ServerError(ErrorType.INVALID_CUSTOMER_CREDENTIALS);
    }
}

async function getCustomerDetails(idNumber) {
    if (!idNumber) {
        throw new ServerError(ErrorType.MISSING_CUSTOMER_PARAMETERS);
    }
    let customerDetails = await customersDal.getCustomerActiveCartDetails(idNumber);
    if (customerDetails) {
        customerDetails.finalOrderPrice = 0;
        customerDetails.orderDate = '';
    }

    if (!customerDetails) {
        customerDetails = await customersDal.getCustomerRecentOrderDetails(idNumber);
        customerDetails.cartCreationDate = '';
        customerDetails.cartId = 0;
        customerDetails.isActiveCart = 0;
    }
    return customerDetails
}



async function createCustomerToken(customerLoginDetails, customerFirstName) {
    const customerToken = jwt.sign({ idNumber: customerLoginDetails.idNumber, firstName: customerFirstName, password: customerLoginDetails.password }, config.secret);
    return customerToken
}

function encryptPassword(customerPassword) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + customerPassword + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

function validateCustomerDetails(customerSignupDetails) {
    let passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$");
    let emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    let confirmPasswordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$");
    let firstNamePattern = new RegExp("^.{3,}$");
    let lastNamePattern = new RegExp("^.{3,}$");
    let streetPattern = new RegExp("[a-zA-Z][a-zA-Z0-9 ]{2,}$");

    if (!customerSignupDetails.cityName || !customerSignupDetails.confirmPassword || !customerSignupDetails.email || !customerSignupDetails.firstName || !customerSignupDetails.lastName || !customerSignupDetails.streetName) {
        throw new ServerError(ErrorType.MISSING_CUSTOMER_PARAMETERS);
    }

    if (customerSignupDetails.password != customerSignupDetails.confirmPassword) {
        throw new ServerError(ErrorType.PASSWORDS_DONT_MATCH);
    }

    if (emailPattern.test(customerSignupDetails.email) === false) {
        throw new ServerError(ErrorType.INVALID_EMAIL_ADDRESS_PATTERN);
    }

    if (passwordPattern.test(customerSignupDetails.password) === false) {
        throw new ServerError(ErrorType.INVALID_PASSWORD_PATTERN);
    }

    if (confirmPasswordPattern.test(customerSignupDetails.confirmPassword) === false) {
        throw new ServerError(ErrorType.INVALID_CONFIRM_PASSWORD_PATTERN);
    }

    if (firstNamePattern.test(customerSignupDetails.firstName) === false) {
        throw new ServerError(ErrorType.INVALID_FIRST_NAME_PATTERN);
    }

    if (lastNamePattern.test(customerSignupDetails.lastName) === false) {
        throw new ServerError(ErrorType.INVALID_LAST_NAME_PATTERN);
    }

    if (streetPattern.test(customerSignupDetails.streetName) === false) {
        throw new ServerError(ErrorType.INVALID_STREET_PATTERN);
    }
}

function validateCustomerIdAndPassword(idNumber, password) {
    let idNumberPattern = new RegExp("^\\d{9}$");
    let passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$");


    if (!idNumber || !password) {
        throw new ServerError(ErrorType.MISSING_CUSTOMER_PARAMETERS);
    }

    if (passwordPattern.test(password) === false) {
        throw new ServerError(ErrorType.INVALID_PASSWORD_PATTERN);
    }

    if (idNumberPattern.test(idNumber) === false) {
        throw new ServerError(ErrorType.INVALID_ID_NUMBER_PATTERN);
    }
}




module.exports = {
    signupCustomer,
    loginCustomer,
    getCustomerDetails
}