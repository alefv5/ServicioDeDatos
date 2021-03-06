const { Nodo } = require('../models');
const NodoService = {
    encontrarTodosLosNodos: async(request, response) => {
        let todosLosNodos = await Nodo.findAll({
            attributes: {exclude: ['NodoId']},
            include: 'sedes'
        });
        todosLosNodos = todosLosNodos.map(x => x.dataValues);
        return { 'response': todosLosNodos };
    },

    actualizarNodo: async(request, response) => {
        const nodo = await Nodo.findByPk(request.params.id);
        return { message: "El nodo fue actualizado exitosamente", Nodo: nodo };

    },

    crearNodo: async(request, response) => {
        const nodo = await Nodo.create(request.body);
        return { message: "El nodo fue creado exitosamente", result: nodo };

    },
    
    eliminarNodo: async(request, response) => {
        const nodo = await Nodo.destroy({ where: { id: request.params.id } });
        return { message: "El nodo fue eliminado exitosamente", result: nodo };
    },
}

module.exports = NodoService;