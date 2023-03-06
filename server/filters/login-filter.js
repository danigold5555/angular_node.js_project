const expressJwt = require("express-jwt")
const config = require("../config/config.json")
const { secret } = config

function loginFilter() {
    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            { url: "/categories", method: "GET" },
            { url: "/products/count", method: "GET" },
            { url: "/orders/count", method: "GET" },
            { url: "/products/category", method: "POST" },
            { url: "/products/search", method: "POST" },
            { url: "/customers/signup", method: "POST" },
            { url: "/customers/login", method: "POST" },
        ]
    });
};

module.exports = loginFilter