// const User = require('./user.model');

const db = require("../models");
const User = db.users;
const Role = db.roles;
// const Role = require('./role.model');
module.exports = (db) => {
    db.roles.hasMany(db.users);
    db.users.belongsTo(db.roles);
}