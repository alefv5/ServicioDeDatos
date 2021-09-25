'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable('Inscriptos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            estudianteId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cursoId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('Inscriptos');
    }
};