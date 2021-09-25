'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable('Estudiantes', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            dni: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            tipoDNI: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            apellido: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nacionalidad: {
                type: Sequelize.STRING,
                allowNull: true
            },
            fechaNacimiento: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            correo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            correoOpcional: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            celular: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            linkedin: {
                type: Sequelize.STRING,
                allowNull: true
            },
            zona: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            detalle: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            añoGraduacion: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            topico: {
                type: Sequelize.STRING,
                allowNull: true
            },
            periodo: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            profesor: {
                type: Sequelize.STRING,
                allowNull: true
            },
            nombrePrimerTrabajo: {
                type: Sequelize.STRING,
                allowNull: true
            },
            trabajaActualmente: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            trabajaSistemas: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            experienciaSistemas: {
                type: Sequelize.STRING,
                allowNull: true
            },
            estudiosSistemas: {
                type: Sequelize.STRING,
                allowNull: true
            },
            fechaActualTrabajo: {
                type: Sequelize.DATE,
                allowNull: true
            },
            lugarActualTrabajo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            fechaPrimerEmpleo: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            nivelInglesId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            estadoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sedeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            nodoId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('Estudiantes');
    }
};