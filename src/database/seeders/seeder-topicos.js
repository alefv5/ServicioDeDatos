'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Topicos', 
        [
            {
                nombre: 'Testing Funcional',
            },
            {
                nombre: 'Testing Automation',
            },
            {
                nombre: 'Introducción a la Programación',
            },
            {
                nombre: 'Alfabetización Digital',
            },
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Topicos', null, {});
    }
};