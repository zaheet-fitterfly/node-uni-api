const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const db = require("../models");
const Admin = db.users;

verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send("access denied without token");
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send("unauthorised token");
        }

        const decodedx = jwt.verify(token, config.secret);
        console.log("decoded", decodedx);
        req.user = decoded;
        next();

    });
};

const decodedToken = verifyToken.token;
console.log("in decoded token", decodedToken);

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;