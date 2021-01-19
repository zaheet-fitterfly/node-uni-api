module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.INTEGER
        },
        belongs_to: {
            type: Sequelize.STRING
        },
        Uni: {
            type: Sequelize.STRING
        }


    });


    return User;
};