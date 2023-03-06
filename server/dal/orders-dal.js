const connection = require('./connection-wrapper');

async function countAllOrders() {
    let sql = `SELECT COUNT(*) AS ordersQuantity FROM orders`
    let [ordersQuantity] = await connection.execute(sql);
    return ordersQuantity;
}

async function getAllShipmentsDates() {
    let sql = `SELECT DATE_FORMAT(date_for_shipment, '%Y-%m-%d') as shipmentDate FROM orders`
    let allShipmentsDates = await connection.execute(sql);
    return allShipmentsDates;
}

async function closeActiveCustomerCart(customerId,cartId) {
let sql = `UPDATE carts SET is_active=0 WHERE id = ? and customer_id = ?`;
let parameters = [cartId,customerId];
await connection.executeWithParameters(sql, parameters);
}

async function createNewCustomerOrder(customerOrderDetails) {
    let sql = `INSERT into orders(customer_id,cart_id,final_price,city_for_shipment,street_for_shipment,date_for_shipment,order_date,four_last_digits)` +
    `values(?,?,?,?,?,?,?,?)`;
let parameters = [customerOrderDetails.customerId,customerOrderDetails.cartId,customerOrderDetails.finalPrice,customerOrderDetails.cityName,customerOrderDetails.streetName,customerOrderDetails.shipmentDate,customerOrderDetails.orderDate,customerOrderDetails.creditCard];
await connection.executeWithParameters(sql, parameters);
}

async function countNumberOfShipmentsInSelectedDate(customerShipmentDate){
    let sql = `SELECT COUNT(date_for_shipment) as numberOfShipmentsInDate FROM orders where date_for_shipment=?`
    let parameters = [customerShipmentDate];
    let [numberOfShipmentsDates] = await connection.executeWithParameters(sql,parameters);
    return numberOfShipmentsDates.numberOfShipmentsInDate;
}





module.exports = {
    countAllOrders,
    getAllShipmentsDates,
    closeActiveCustomerCart,
    createNewCustomerOrder,
    countNumberOfShipmentsInSelectedDate
};