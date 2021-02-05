const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const cls = require('cls-hooked');
const namespace = cls.createNamespace('zee');
Sequelize.useCLS(namespace);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.relation = require("./relations")(db);
// db.role = require("../models/role.model.js")(sequelize, Sequelize);



// db.role.belongsToMany(db.users, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
// });
// db.users.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
// });

// db.ROLES = ["user", "admin", "moderator"];
// db.lists = require("./list.model.js")(sequelize, Sequelize);

module.exports = db;