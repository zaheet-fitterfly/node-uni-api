const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Role = db.roles;
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const response = require('../helpers/response');

const validation = require("../helpers/validator");
const { roles, users } = require("../models");
// const { body, validationResult } = require('express-validator')


// Create and Save a new Tutorial
const Rolex = {
    async signin(req, res) {
        // Validate request
        const validationRule = {


            "password": "required|string"
        }



        validation(req.body, validationRule, {}, async(err, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                db.sequelize.transaction(async(t1) => {

                    const user = await User.findOne({
                        where: {
                            email: req.body.email
                        },
                    });
                    console.log(req.body.email);
                    console.log("password", req.body.password);

                    if (!user) {
                        return response(res, 404, "Invalid access. Please check rolename and Password.");
                    }
                    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                    if (!passwordIsValid) {
                        return response(res, 404, "Invalid access. Please check rolename and Password.");
                    }

                    // const validPassword = await bcrypt.compare(req.body.password, user.password);
                    // if (!validPassword) return res.status(400).send("invalid email or pwd");
                    // // const token = user.generateAuthToken();
                    console.log("user----", users);
                    const token = jwt.sign({ _id: user.id, roleId: user.level, belongs_to: user.belongs_to }, config.secret, { expiresIn: 86400 });
                    console.log(token);

                    return response(res, 200, null, {
                        token: token,
                    });

                });

            }
        })
    }
}

module.exports = Rolex;