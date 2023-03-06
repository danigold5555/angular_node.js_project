const connection = require('./connection-wrapper');

async function createCustomerCart(customerDetails) {
    let sql = `INSERT into carts(customer_id,creation_date,is_active)` +
    `values(?,?,?)`;
let parameters = [customerDetails.customerId,customerDetails.currentDate,1];
await connection.executeWithParameters(sql, parameters);
}

async function getCustomerCartId(customerId) {
    let sql = `SELECT id FROM carts WHERE customer_id = ? and is_active = 1`;
    let parameters = [customerId];
    let [response] = await connection.executeWithParameters(sql, parameters);
    return response
}


module.exports = {
    createCustomerCart,
    getCustomerCartId
};