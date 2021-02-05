module.exports = {
    up: (queryInterface, Sequelize) => {
        // return queryInterface.sequelize.transaction((t) => {
        //     // return Promise.all([
        //     //     queryInterface.addColumn('users', 'completed', {
        //     //         type: Sequelize.STRING
        //     //     }, { transaction: t })
        //     // ])
        // })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('users', 'completed', { transaction: t })
            ])
        })
    }
};