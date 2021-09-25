'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable('Cursos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            NodoId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            SedeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            TopicoId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            horario: {
                type: Sequelize.STRING,
                allowNull: true
            },
            profesores: {
                type: Sequelize.STRING,
                allowNull: true
            },
            notas: {
                type: Sequelize.STRING,
                allowNull: true
            },
            anio: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            periodo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estado: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            esEgresade: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('Cursos');
    }
};