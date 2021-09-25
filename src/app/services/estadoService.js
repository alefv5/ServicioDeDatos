const { Estado } = require('../models');
const EstadoService = {
    encontrarTodosLosEstados: async(request, response) => {
        let todosLosEstados = await Estado.findAll();
        todosLosEstados = todosLosEstados.map(x => x.dataValues);
        return { 'response': todosLosEstados };
    }
}

module.exports = EstadoService;