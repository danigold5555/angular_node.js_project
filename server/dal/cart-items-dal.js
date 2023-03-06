const connection = require('./connection-wrapper');

async function checkIfCartProductExist(addedProductDetails) {
    let sql = `SELECT product_id as productId FROM cart_items WHERE cart_id = ?`;
    let parameters = [addedProductDetails.cartId];
    let response = await connection.executeWithParameters(sql, parameters);
    return response
}

async function addProductToCustomerCart(addedProductDetails){
    let sql = `INSERT into cart_items(cart_id,product_id,quantity,total_price)` +
    `values(?,?,?,?)`;
let parameters = [addedProductDetails.cartId,addedProductDetails.id,addedProductDetails.quantity,addedProductDetails.totalPrice];
await connection.executeWithParameters(sql, parameters);
}

async function getCustomerCartItems(customerCartObject) {
    let sql = `SELECT ci.product_id as id, pr.name, pr.price, pr.image, ci.quantity, ci.total_price as totalPrice FROM cart_items ci
    LEFT JOIN carts ca ON ca.id = ci.cart_id LEFT JOIN products pr ON pr.id = ci.product_id
    WHERE ca.customer_id=? and ca.id=?`;
    let parameters = [customerCartObject.customerId, customerCartObject.cartId];
    let customerCartItems = await connection.executeWithParameters(sql,parameters);
    return customerCartItems
}

async function deleteCartItem(deletedCartProductId,cartId) {
    let sql = `DELETE FROM cart_items WHERE cart_id =? and product_id=?`
    let parameters = [cartId,deletedCartProductId];
    await connection.executeWithParameters(sql, parameters);
}

async function clearCustomerCart(cartId) {
    let sql = `DELETE FROM cart_items where cart_id =?`
    let parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);
}



module.exports = {
checkIfCartProductExist,
addProductToCustomerCart,
getCustomerCartItems,
deleteCartItem,
clearCustomerCart
};