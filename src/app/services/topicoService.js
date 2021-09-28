const { Topico } = require('../models');

const topicoService = {
    encontrarTodosLosTopicos: async()=>{
        let todosLosTopicos = await Topico.findAll();
        todosLosTopicos = todosLosTopicos.map(x => x.dataValues);
        return { 'response': todosLosTopicos };
    },
    encontrarTopicoPorId: async(Topicoid)=>{
        let topico = await Topico.findByPk(Topicoid);
        return { 'respuesta': topico };
    },
    crearTopico: async(request, response) => {
        const nuevoTopico = await Topico.create(request.body);
        return { message: "El Topico fue creado exitosamente", result: nuevoTopico};

    },
    editarTopico: async(request, response) => {
        await Topico.update(request.body, { where: { id: request.params.id } });
        let topico = await Topico.findByPk(request.params.id);
        return { message: "El Topico fue editado exitosamente", Topico: topico };
    },
    eliminarTopico: async (request, response) => {
        let message='';
        const resultado = await Topico.destroy({
          where: { id: request.params.id }
        });
        if(resultado == 0){
          message= `No se encontro ningun topico con el id: ${request.params.id}`;
        } else {
          message= "El Topico fue eliminado exitosamente";
        }
        return {
          message,
          result: resultado
        };            

    },
};

module.exports = topicoService;