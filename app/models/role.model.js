module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {

        name: {
            type: Sequelize.STRING
        },

        password: {
            type: Sequelize.STRING
        },
        roleId: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.STRING
        },
        Uni: {
            type: Sequelize.STRING
        }

    });

    return Role;
};