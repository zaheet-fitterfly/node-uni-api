const db = require("../models");
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const bcrypt = require('bcrypt');
const validation = require("../helpers/validator");
const Helper = require("../helpers/hash");
const { sequelize } = require("../models");
const response = require("../helpers/response");
const useraccess = require("../middleware/useradmin");
const authJwt = require("../middleware/authJwt");
const admin = require("../middleware/superadmin");
// const { body, validationResult } = require('express-validator')
const ROLE = {
    ADMIN: "admin",
    SUPERADMIN: "superAdmin"
};

// Create and Save a new Tutorial
const Userx = {


    async create(req, res, next) {
        // Validate request


        const validationRule = {
            "name": "required|string",
            "email": "required|email",
            "gender": "required|string",
            "mobile": "string",
            "belongs_to": "string",
            "level": "integer",
            "Uni": "string"
        }




        validation(req.body, validationRule, {}, (err, status) => {

            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                db.sequelize.transaction(async(t1) => {



                    const token = req.header('x-auth-token');
                    const decodedx = jwt.verify(token, config.secret);
                    req.body.belongs_to = decodedx.roleId;
                    req.body.level = "2";
                    req.body.Uni = decodedx.uni;

                    console.log("decodexxx----", decodedx);
                    req.body.password = Helper.hashPassword(req.body.password);;


                    User.create(req.body)
                        .then(data => {



                            console.log("in create:::", data.password);

                            // const token = jwt.sign({ _id: data.id }, config.secret, { expiresIn: 86400 });


                            return response(res, 200, null, {
                                name: data.name,
                                email: data.email
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Tutorial."
                            })
                        });
                })



            }
        })
    },

    // Retrieve all Tutorials from the database.
    async findAll(req, res) {
        // throw new Error('could not get users');

        const token = req.header('x-auth-token');
        const decodedx = jwt.verify(token, config.secret);
        console.log("inside finall", decodedx);
        if (decodedx.level == 0) {
            const name = decodedx.uni;
            console.log(name);
            var condition = name ? {
                Uni: {
                    [Op.iLike]: `%${name}%`
                }
            } : null;

            User.findAll({ where: condition })
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "sorry not able to find tuts zee."
                    })
                })
        } else {
            const name = decodedx.roleId;
            console.log(name);
            var condition = name ? {
                belongs_to: {
                    [Op.iLike]: `%${name}%`
                }
            } : null;

            User.findAll({ where: condition })
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "sorry not able to find tuts zee."
                    })
                })

        }
    },

    // Find a single Tutorial with an id
    async findOne(req, res) {
        const token = req.header('x-auth-token');
        const decodedx = jwt.verify(token, config.secret);
        const id = req.params.id;


        console.log("user findone details-", decodedx);
        if (decodedx._id != id && decodedx.roleId != 0) {
            return res.send("not access");
        }
        User.findByPk(id)
            .then(data => {
                console.log("findon data", data.id);
                // if(data.id === id){}
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "use some real id boy=" + id
                })
            })
    },

    // Update a Tutorial by the id in the request
    async update(req, res) {
        const id = req.params.id;

        User.update(req.body, {
                where: { id: id }
            })
            .then(xyz => {
                if (xyz == 1) {
                    res.send({
                        message: "Tutorial was updated successfully." + xyz
                    });
                } else {
                    res.send({
                        message: `Cannot update Tutorial `
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Tutorial with id=" + id
                })
            })
    },
    // Delete a Tutorial with the specified id in the request
    async delete(req, res) {
        const id = req.params.id;

        User.destroy({
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User data was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Tutorial with id=" + id
                })
            })
    },
    // Delete all Tutorials from the database.
    async deleteAll(req, res) {
        User.destroy({
                where: {},
                truncate: false
            })
            .then(nums => {
                if (nums === 0) {
                    res.send("there are not data in file which could be deleted");
                } else {
                    res.send({ message: `${nums} users were deleted successfully!` });
                }
                User.sync({ force: true });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while removing all tutorials."
                })
            })
    },

    // find all published Tutorial
    async findAllPublished(req, res) {
        User.findAll({ where: { published: true } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            })
    }
}
module.exports = Userx;