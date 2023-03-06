const cartsLogic = require("../logic/carts-logic")
const express = require("express");
const router = express.Router();


router.post("/new", async (request, response, next) => {
    let customerDetails = request.body;
    try {
       let customerCartId = await cartsLogic.createCustomerCart(customerDetails);
        response.json(customerCartId);
    }
    catch (e) {
        return next(e);
    }
});


module.exports = router;