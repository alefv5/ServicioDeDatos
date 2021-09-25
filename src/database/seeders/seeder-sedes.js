'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Sedes', 
        [
            {
                nombre: 'Intive',
                NodoId: 1
            },
            {
                nombre: 'Ituzaingó',
                NodoId: 4
            },
            {
                nombre: 'Kleer',
                NodoId: 1
            },
            {
                nombre: 'Technisys',
                NodoId: 1
            },
            {
                nombre: 'Contra viento y marea',
                NodoId: 3
            },
            {
                nombre: 'Hipoacusia',
                NodoId: 1
            },
            {
                nombre: 'Bachi Barrio 31',
                NodoId: 1
            },
            {
                nombre: 'Tierra Violeta',
                NodoId: 1
            },
            {
                nombre: 'La Carbonilla',
                NodoId: 1
            },
            {
                nombre: 'NIT',
                NodoId: 1
            },
            {
                nombre: 'ORT',
                NodoId: 1
            },
            {
                nombre: 'Paternal',
                NodoId: 1
            },
            {
                nombre: 'Rosario',
                NodoId: 2
            },
            {
                nombre: 'Máximo Paz',
                NodoId: 2
            },
            {
                nombre: 'Gonzalez Catán',
                NodoId: 5
            },
            {
                nombre: 'Pacheco',
                NodoId: 6
            },
            {
                nombre: 'Mendoza',
                NodoId: 7
            },
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Sedes', null, {});
    }
};