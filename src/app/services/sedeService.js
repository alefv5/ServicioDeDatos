const { Sede, Nodo } = require('../models');
const SedeService = {
    encontrarTodasLasSedes: async(request, response) => {
        let sedes = await Sede.findAll({
            include: {
                model: Nodo,
                as: 'nodo',
                attributes: {exclude: ['SedeId']}
            }
        });
        sedes = sedes.map(x => x.dataValues);
        return { 'response': sedes };
    },

    encontrarSedesPorNodo: async(parametros) => {
        let todasLasSedes = await Sede.findAll({
            where: parametros,
            attributes: {exclude: 'NodoId'}
        });
        todasLasSedes = todasLasSedes.map(x => x.dataValues);
        return { 'response': todasLasSedes };
    },

    actualizarSede: async(request, response) => {
        await Sede.update(request.body, { where: { id: request.params.id } });
        let sede = await Sede.findByPk(request.params.id);
        return { message: "La sede fue actualizada exitosamente", Sede: sede };

    },

    crearSede: async(request, response) => {
        try {
            const sede = await Sede.create(request.body);
            return { message: "La sede fue creada exitosamente", result: sede };
        } catch (error) {
            throw error;
        }
    },
    
    eliminarSede: async(request, response) => {
        try {
            const sede = await Sede.destroy({ where: { id: request.params.id } });
            return { message: "La sede fue eliminada exitosamente", result: sede };
        } catch (error) {
            throw error;
        }
    },

}
module.exports = SedeService;