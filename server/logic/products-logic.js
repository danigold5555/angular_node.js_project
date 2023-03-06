const productsDal = require("../dal/products-dal");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");


async function getCategoryProducts(categoryId) {
    validateCategoryId(categoryId)
    let categoryProducts = await productsDal.getCategoryProducts(categoryId);
    if (categoryProducts.length == 0) {
        throw new ServerError(ErrorType.NO_CATEGORY_PRODUCTS);
    }
    return categoryProducts
}

async function getSearchedProducts(searchValue) {
    validateSearchValue(searchValue)
    let searchResults = await productsDal.getSearchedProducts(searchValue);
    return searchResults
}



async function countAllProducts() {
    let productsQuantity = await productsDal.countAllProducts();
    if (!productsQuantity) {
        throw new ServerError(ErrorType.INVALID_PRODUCTS_COUNT);
    }
    return productsQuantity
}

async function addNewProduct(addedProductDetails) {
    let productsQuantity = await productsDal.countAllProducts();
    validateProductDetails(addedProductDetails)
    validateAddedProductId(addedProductDetails,productsQuantity)
    let isProductNameExist = await productsDal.isProductNameExist(addedProductDetails.name);
    if (isProductNameExist) {
        throw new ServerError(ErrorType.PRODUCT_ALREADY_EXIST);    
    }
    await productsDal.addNewProduct(addedProductDetails)
}

async function editProduct(editedProductDetails) {
    validateProductDetails(editedProductDetails)
    let isProductIdExist = await productsDal.isProductIdExist(editedProductDetails.id);
    if (!isProductIdExist) {
        throw new ServerError(ErrorType.INVALID_PRODUCT_NAME);    
    }
    await productsDal.editProduct(editedProductDetails)
}

function validateCategoryId(categoryId) {
    if (!categoryId) {
        throw new ServerError(ErrorType.INVALID_CATEGORY_ID);
    }
}

function validateSearchValue(searchValue) {
    if (!searchValue) {
        throw new ServerError(ErrorType.INVALID_SEARCH_VALUE);
    }

    if ((searchValue.length > 20)) {
        throw new ServerError(ErrorType.INVALID_SEARCH_VALUE);
    }
}

function validateProductDetails(addedProductDetails) {
    let namePattern = new RegExp("[a-zA-Z][a-zA-Z ]{2,}$");
    let pricePattern = new RegExp("^-?[0-9]\\d*(\\.\\d{0,})?$");
    let imagePrefix = "http";
    addedProductDetails.name = addedProductDetails.name.toLowerCase().trim().replace(/\b\w/g, first => first.toLocaleUpperCase());

    if (addedProductDetails.id == 0 || addedProductDetails.name == '' || addedProductDetails.categoryId == 0 || addedProductDetails.price == 0 || addedProductDetails.image == '') {
        throw new ServerError(ErrorType.MISSING_PRODUCT_DETAILS);
    }

    if (!addedProductDetails.id || !addedProductDetails.name || !addedProductDetails.categoryId || !addedProductDetails.price || !addedProductDetails.image) {
        throw new ServerError(ErrorType.MISSING_PRODUCT_DETAILS);
    }

    if (namePattern.test(addedProductDetails.name) === false) {
        throw new ServerError(ErrorType.INVALID_PRODUCT_NAME);
    }

    if (pricePattern.test(addedProductDetails.price.toString()) === false) {
        throw new ServerError(ErrorType.INVALID_PRODUCT_PRICE);
    }

    if (addedProductDetails.image.length < 4 || addedProductDetails.image.startsWith(imagePrefix) == false) {
        throw new ServerError(ErrorType.INVALID_PRODUCT_IMAGE);
    }

    if (addedProductDetails.categoryId.toString() != '1' && addedProductDetails.categoryId.toString() != '2' && addedProductDetails.categoryId.toString() != '3' && addedProductDetails.categoryId.toString() != '4') {
        throw new ServerError(ErrorType.INVALID_PRODUCT_CATEGORY);
    }
}

function validateAddedProductId(addedProductDetails,productsQuantity) {
    if (addedProductDetails.id != productsQuantity.productsQuantity + 1) {
        throw new ServerError(ErrorType.INVALID_PRODUCT_ID);
    }
}



module.exports = {
    getCategoryProducts,
    getSearchedProducts,
    countAllProducts,
    addNewProduct,
    editProduct
}