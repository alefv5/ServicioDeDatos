'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable('Sedes', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            NodoId: {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('Sedes');
    }
};