const customersLogic = require("../logic/customers-logic")
const express = require("express");
const router = express.Router();


router.post("/signup", async (request, response, next) => {
    let customerSignupDetails = request.body;
    try {
        await customersLogic.signupCustomer(customerSignupDetails);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/login", async (request, response, next) => {
    let customerLoginDetails = request.body;
    try {
       let successfulLoginServerResponse = await customersLogic.loginCustomer(customerLoginDetails);
        response.json(successfulLoginServerResponse);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/details", async (request, response, next) => {
    let customerIdNumber = request.body.idNumber;
    try {
       let customerDetails = await customersLogic.getCustomerDetails(customerIdNumber);
        response.json(customerDetails);
    }
    catch (e) {
        return next(e);
    }
});



module.exports = router;