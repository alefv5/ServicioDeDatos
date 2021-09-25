'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('NivelIngles', 
        [
            {
                nombre: 'Basico',
            },
            {
                nombre: 'Intermedio',
            },
            {
                nombre: 'Avanzado',
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('NivelIngles', null, {});
    }
};