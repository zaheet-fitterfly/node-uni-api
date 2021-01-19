module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const roles = require("../controllers/role.controller.js");
    const auth = require("../controllers/auth.controller.js");
    const authuser = require("../controllers/authuser.controller.js");
    const authJwt = require("../middleware/authJwt");
    const superadmin = require("../middleware/superadmin");
    const admin = require("../middleware/admin");
    const user = require("../middleware/user");
    const error = require("../helpers/error");
    // const asyncMiddleware = require("../middleware/async");


    var router = require("express").Router();
    const { body } = require('express-validator')
    app.post("/admin/signin", auth.signin);
    app.post("/user/signin", authuser.signin);
    app.post("/users/", users.create);
    app.post("/users/:id", [authJwt.verifyToken, superadmin], users.create);

    app.post("/roles/:role", roles.create);

    // app.use(authJwt.verifyToken);


    //authentication
    // app.use(adminJwt);

    // app.get("/users/superadmin", [authJwt.verifyToken, superadmin], users.findAll);
    app.get("/users/admin", [authJwt.verifyToken, admin], users.findAll);

    app.get("/users/published", [authJwt.verifyToken, superadmin], users.findAllPublished);


    app.put("/users/:id", [authJwt.verifyToken, superadmin], users.update);
    app.delete("/users/:id", [authJwt.verifyToken, superadmin], users.delete);

    app.delete("/users/", [authJwt.verifyToken, superadmin], users.deleteAll);


    app.get("/users/:id", [authJwt.verifyToken, user], users.findOne);
    app.get("/users/superadmin/:id", [authJwt.verifyToken, superadmin], users.findOne);
    app.use(error);

};