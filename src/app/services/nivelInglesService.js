const { NivelIngles } = require('../models');
const NivelInglesService = {
    encontrarTodosLosNivelesIngles: async(request, response) => {
        let todosLosNivelesIngles = await NivelIngles.findAll();
        todosLosNivelesIngles = todosLosNivelesIngles.map(x => x.dataValues);
        return { 'response': todosLosNivelesIngles };
    }
}

module.exports = NivelInglesService;