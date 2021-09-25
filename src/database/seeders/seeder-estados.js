'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Estados', 
        [   
            {
                nombre: 'Alumne',
            },
            {
                nombre: 'Egresade',
            },
            {
                nombre: 'Empleade',
            },
            {
                nombre: 'Abandonade',
            },
            {
                nombre:'Egresade/Alumne',
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Estados', null, {});
    }
};