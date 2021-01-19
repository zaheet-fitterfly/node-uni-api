const db = require("../models");
const Role = db.roles;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const bcrypt = require('bcrypt');
const validation = require("../helpers/validator");
const Helper = require("../helpers/hash");
const { sequelize } = require("../models");
const response = require("../helpers/response");
// const { body, validationResult } = require('express-validator')


// Create and Save a new Tutorial
const Rolex = {

    async create(req, res, next) {
        // Validate request


        const validationRule = {
            "name": "required|string",
            "roleId": "string",
            "level": "required|string",
            "Uni": "string",
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
                    console.log("Inside ROLEEEEE");
                    req.body.password = Helper.hashPassword(req.body.password);
                    req.body.roleId = req.params.role;
                    Role.create(req.body)
                        .then(data => {

                            const hashPassword = Helper.hashPassword(req.body.password);
                            console.log(hashPassword);
                            data.password = hashPassword;
                            console.log("in create:::", data.password);
                            // console.log(data.isAdmin);
                            const token = jwt.sign({ _id: data.id }, config.secret, { expiresIn: 86400 });

                            return response(res, 200, null, {
                                name: data.name,
                                roleId: data.roleId,
                                level: data.level
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Tutorial."
                            })
                        });
                });


            }
        })
    },

    // Retrieve all Tutorials from the database.
    async findAll(req, res) {

        const name = req.query.name;
        var condition = name ? {
            name: {
                [Op.iLike]: `%${name}%`
            }
        } : null;

        Role.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "sorry not able to find tuts zee."
                })
            })
    },

    // Find a single Tutorial with an id
    async findOne(req, res) {
        const id = req.params.id;

        Role.findByPk(id)
            .then(data => {
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

        Role.update(req.body, {
                where: { id: id }
            })
            .then(xyz => {
                if (xyz == 1) {
                    res.send({
                        message: "user was updated." + xyz
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

        Role.destroy({
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Role data was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Role with id=" + id
                })
            })
    },
    // Delete all Tutorials from the database.
    async deleteAll(req, res) {
        Role.destroy({
                where: {},
                truncate: false
            })
            .then(nums => {
                if (nums === 0) {
                    res.send("there are not data in file which could be deleted");
                } else {
                    res.send({ message: `${nums} Roles were deleted successfully!` });
                }
                Role.sync({ force: true });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while removing all tutorials."
                })
            })
    },

    // find all published Tutorial
    async findAllPublished(req, res) {
        Role.findAll({ where: { published: true } })
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
module.exports = Rolex;