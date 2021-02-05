const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const db = require("../models");
const Admin = db.users;

const crypto = require('crypto');

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
        req.user = decodedx;
        next();

    });
};

roleIdFn = ((req, res, next) => {
    const token = req.header('x-auth-token');
    const decodedx = jwt.verify(token, config.secret);
    const id = decodedx._id;
    console.log(id);
    db.roles.findByPk(id)
        .then(user => {
            req.userz = user;
            console.log("in roleeeeeeeeeeeee", user);
            next();
        }).catch(err => console.log(err));
});

resetPwd = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.send("err", err);
        }

        const reset_token = buffer.toString('hex');
        db.users.findOne({
                email: req.body.email
            })
            .then(user => {
                req.send('error');
            })
    })
};

const decodedToken = verifyToken.token;
console.log("in decoded token", decodedToken);

const authJwt = {
    verifyToken: verifyToken,
    roleIdFn: roleIdFn
};
module.exports = authJwt;