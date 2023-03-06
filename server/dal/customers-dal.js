const connection = require('./connection-wrapper');

async function signupCustomer(customerSignupDetails) {
    let sql = `INSERT into customers(id_number,password,role,first_name,last_name,city_name,street) ` +
    `values(?,?,?,?,?,?,?)`;
let parameters = [customerSignupDetails.idNumber,customerSignupDetails.password,customerSignupDetails.role,customerSignupDetails.firstName,customerSignupDetails.lastName,customerSignupDetails.cityName,customerSignupDetails.streetName];
await connection.executeWithParameters(sql, parameters);
}

async function isCustomerIdExist(customerIdNumber) {
    let sql = `SELECT id_number FROM customers WHERE id_number = ?`;
    let parameters = [customerIdNumber];
    let [response] = await connection.executeWithParameters(sql, parameters);
    if (!response) {
        return false;
    }
    return true
}

async function getCustomerEncryptedPassword(idNumber) {
let sql = `SELECT password FROM customers WHERE id_number = ?`;
let parameters = [idNumber];
let [response] = await connection.executeWithParameters(sql,parameters);

return response.password
}

async function getCustomerFirstName(customerIdNumber){
    let sql = `SELECT first_name as firstName FROM customers WHERE id_number = ?`;
    let parameters = [customerIdNumber];
    let [response] = await connection.executeWithParameters(sql,parameters);
    
    return response.firstName
}

async function getCustomerActiveCartDetails(idNumber){
    let sql = `SELECT cu.first_name as firstName, cu.city_name as cityName, cu.street as streetName, DATE_FORMAT(ca.creation_date, '%d-%m-%Y %H:%i') as cartCreationDate, ca.id as cartId, ca.is_active as isActiveCart FROM customers cu
    LEFT JOIN carts ca ON cu.id_number = ca.customer_id 
     WHERE id_number = ? AND ca.is_active=1 order by ca.creation_date desc limit 1`;
    let parameters = [idNumber];
    let [customerRecentCartDetails] = await connection.executeWithParameters(sql,parameters);
    return customerRecentCartDetails
}

async function getCustomerRecentOrderDetails(idNumber){
    let sql = `SELECT cu.first_name as firstName, cu.city_name as cityName, cu.street as streetName, o.final_price as finalOrderPrice, DATE_FORMAT(o.order_date, '%d-%m-%Y %H:%i') as orderDate FROM customers cu
     LEFT JOIN orders o ON cu.id_number = o.customer_id
     WHERE id_number = ? order by o.order_date desc limit 1`;
    let parameters = [idNumber];
    let [getLoggedInCustomerRecentOrderDetails] = await connection.executeWithParameters(sql,parameters);
    return getLoggedInCustomerRecentOrderDetails
}



module.exports = {
    signupCustomer,
    isCustomerIdExist,
    getCustomerEncryptedPassword,
    getCustomerFirstName,
    getCustomerActiveCartDetails,
    getCustomerRecentOrderDetails
};