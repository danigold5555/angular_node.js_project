const cartItemsLogic = require("../logic/cart-items-logic")
const express = require("express");
const router = express.Router();


router.post("/add", async (request, response, next) => {
    let addededProductDetails = request.body;
    try {
       await cartItemsLogic.addProductToCustomerCart(addededProductDetails);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/list", async (request, response, next) => {
    let customerCartObject = request.body;
    try {
       let customerCartItems = await cartItemsLogic.getCustomerCartItems(customerCartObject);
        response.json(customerCartItems);
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/product/:id", async (request, response, next) => {
    let deletedCartProductId = request.params.id;
    let cartId = request.body.cartId;
    try {
        await cartItemsLogic.deleteCartItem(deletedCartProductId,cartId);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/clear/:cartId", async (request, response, next) => {
    let cartId = request.params.cartId;
    try {
        await cartItemsLogic.clearCustomerCart(cartId);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});



module.exports = router;