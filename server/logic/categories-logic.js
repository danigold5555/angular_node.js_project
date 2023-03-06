const categoriesDal = require("../dal/categories-dal");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");


async function getAllCategories() {
    let categeories = await categoriesDal.getAllCategories();
    if (categeories.length == 0) {
    throw new ServerError(ErrorType.NO_CATEGORIES);    
    }
    return categeories
}



module.exports = {
    getAllCategories
    }