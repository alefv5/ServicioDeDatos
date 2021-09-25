'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cursos', 
        [
            {
                horario: 'Mañana (10:00 - 12:00)',
                profesores: 'Pepe Perez',
                estado: true,
                esEgresade: true,
                periodo: 1,
                anio: 2021,
                TopicoId: 2,
                notas: 'Para Egresades Activo',
                NodoId: 1,
                SedeId: 1
            },
            {
                horario: 'Tarde (12:00 - 15:00)',
                profesores: 'Juan Gabriel',
                notas: 'Para Alumnes Inactivo',
                estado: false,
                esEgresade: false,
                periodo: 1,
                anio: 2020,
                TopicoId: 1,
                NodoId: 1,
                SedeId: 1
            },
            {
                horario: 'Noche (20:00 - 21:00)',
                profesores: 'Luis Miguel',
                notas: 'Para Egresades Inactivo',
                estado: false,
                esEgresade: true,
                periodo: 1,
                anio: 2020,
                TopicoId: 1,
                NodoId: 1,
                SedeId: 1
            },
            {
                horario: 'Tarde (12:00 - 15:00)',
                profesores: 'Marisa Domain',
                notas: 'Para Alumnes Activo',
                estado: true,
                esEgresade: false,
                periodo: 1,
                anio: 2020,
                TopicoId: 1,
                NodoId: 1,
                SedeId: 1
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Cursos', null, {});
    }
};