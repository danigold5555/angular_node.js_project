const productsLogic = require("../logic/products-logic")
const express = require("express");
const router = express.Router();


router.post("/category", async (request, response, next) => {
    let categoryId = request.body.categoryId;
    try {
       let categoryProducts = await productsLogic.getCategoryProducts(categoryId);
        response.json(categoryProducts);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/search", async (request, response, next) => {
    let searchValue = request.body.searchValue;
    try {
       let searchResults = await productsLogic.getSearchedProducts(searchValue);
        response.json(searchResults);
    }
    catch (e) {
        return next(e);
    }
});

router.get("/count", async (request, response, next) => {
    try {
       let productsQuantity = await productsLogic.countAllProducts();
        response.json(productsQuantity);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/new", async (request, response, next) => {
    let addedProductDetails = request.body;
    try {
       await productsLogic.addNewProduct(addedProductDetails);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.put("/edit", async (request, response, next) => {
    let editedProductDetails = request.body;
    try {
       await productsLogic.editProduct(editedProductDetails);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});



module.exports = router;