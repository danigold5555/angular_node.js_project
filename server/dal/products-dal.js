const connection = require('./connection-wrapper');

async function getCategoryProducts(categoryId) {
    let sql = `SELECT id,name,category_id as categoryId, price, image FROM products WHERE category_id = ?`
    let parameters = [categoryId]
    let categoryProducts = await connection.executeWithParameters(sql, parameters);
    return categoryProducts;
}

async function getSearchedProducts(searchValue) {
    let sql = `SELECT id,name,category_id as categoryId, price, image FROM products WHERE name LIKE LOWER(CONCAT('%', ?,  '%'))`
    let parameters = [searchValue]
    let searchResults = await connection.executeWithParameters(sql, parameters);
    return searchResults;
}

async function countAllProducts() {
    let sql = `SELECT COUNT(*) AS productsQuantity FROM products`
    let [productsQuantity] = await connection.execute(sql);
    return productsQuantity;
}

async function addNewProduct(addedProductDetails){
    let sql = `INSERT into products(id,name,category_id,price,image)` +
    `values(?,?,?,?,?)`;
    let parameters = [addedProductDetails.id,addedProductDetails.name,addedProductDetails.categoryId,addedProductDetails.price,addedProductDetails.image];
    await connection.executeWithParameters(sql,parameters);
}

async function isProductNameExist(productName) {
    let sql = `SELECT name FROM products WHERE name = ?`;
    let parameters = [productName];
    let [response] = await connection.executeWithParameters(sql, parameters);
    if (!response) {
        return false;
    }
    return true
}

async function isProductIdExist(productId) {
    let sql = `SELECT id FROM products WHERE id = ?`;
    let parameters = [productId];
    let [response] = await connection.executeWithParameters(sql, parameters);
    if (!response) {
        return false;
    }
    return true
}

async function editProduct(editedProductDetails){
    let sql = `UPDATE products SET name=?, category_id=?, price=?, image=? WHERE id = ?`
    let parameters = [editedProductDetails.name, editedProductDetails.categoryId, editedProductDetails.price, editedProductDetails.image, editedProductDetails.id];
    await connection.executeWithParameters(sql, parameters);
}





module.exports = {
    getCategoryProducts,
    getSearchedProducts,
    countAllProducts,
    addNewProduct,
    isProductNameExist,
    editProduct,
    isProductIdExist
};