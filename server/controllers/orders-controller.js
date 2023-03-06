const ordersLogic = require("../logic/orders-logic")
const express = require("express");
const router = express.Router();

router.get("/count", async (request, response, next) => {
    try {
       let ordersQuantity = await ordersLogic.countAllOrders();
        response.json(ordersQuantity);
    }
    catch (e) {
        return next(e);
    }
});

router.get("/shipments", async (request, response, next) => {
    try {
       let allShipmentsDates = await ordersLogic.getAllShipmentsDates();
        response.json(allShipmentsDates);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/new", async (request, response, next) => {
    let customerOrderDetails = request.body;
    try {
       await ordersLogic.createNewCustomerOrder(customerOrderDetails);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});





module.exports = router;