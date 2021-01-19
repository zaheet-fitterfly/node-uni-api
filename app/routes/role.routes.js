module.exports = app => {
    const roles = require("../controllers/role.controller.js");
    const auth = require("../controllers/auth.controller.js");
    const users = require("../controllers/user.controller.js");
    const authJwt = require("../middleware/authJwt");
    const superadminJwt = require("../middleware/superadmin");
    const error = require("../helpers/error");
    // const asyncMiddleware = require("../middleware/async");


    var router = require("express").Router();
    const { body } = require('express-validator')



    //authentication

    app.use(superadminJwt);
    app.get("/users/:id", users.findOne);
    // app.use(error);


};