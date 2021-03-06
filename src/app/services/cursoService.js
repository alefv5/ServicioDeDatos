const { Curso, Nodo, Sede, Topico, Inscripto, Estudiante, NivelIngles } = require('../models');
const CursoService = {
    encontrarTodosLosCursos: async(request, response) => {
        let todosLosCursos = await Curso.findAll();
        todosLosCursos = todosLosCursos.map(x => x.dataValues);
        return { 'response': todosLosCursos };
    },
    
    encontrarCursos: async(parametros) => {
        let todosLosCursos = await Curso.findAll({
            where: parametros,
            attributes: {exclude: ['NodoId','SedeId']},
            include:  [
              {
                  model: Nodo,
                  as: 'nodo',
                  attributes: {exclude: ['id']},
              },
              {
                  model: Sede,
                  as: 'sede',
                  attributes: {exclude: ['id','NodoId']}
              },
              {
                model: Topico,
                as: 'topico',
                attributes: {exclude: ['id']},
              }
            ]
        });
        todosLosCursos = todosLosCursos.map(x => x.dataValues);
        return { 'response': todosLosCursos };
    },
    
    encontrarInscriptesDeUnCurso: async (idCurso) => {
      const curso = await Inscripto.findAll({
        attributes: { exclude: ["cursoId", "estudianteId"] },
        where: { cursoId: Number(idCurso), estadoId: 1 },
        include: [
          {
            model: Estudiante,
            as: "estudiante",
            attributes: { exclude: ["nodoId", "sedeId", "nivelInglesId"] },
            include: [
              {
                model: Nodo,
                as: "nodo"
              },
              {
                model: Sede,
                as: "sede"
              },
              {
                model: NivelIngles,
                as: "nivelIngles"
              }
            ]
          }
        ]
      });
      return { response: curso };
    },

    encontrarCursoPorId: async(cursoId) => {
      let curso = await Curso.findByPk(cursoId,{
        include:  [
          {
            model: Nodo,
            as: 'nodo',
            attributes: {exclude: ['id']},
          },
          {
            model: Sede,
            as: 'sede',
            attributes: {exclude: ['id','NodoId']}
          },
          {
            model: Topico,
            as: 'topico',
            attributes: { include: ['id'] }
          }
        ]
      });
      return { 'respuesta': curso };
    },

    encontrarCursosPorTopicoId: async(topicoId) => {
      let curso = await Curso.findAll({
        where: { TopicoId: Number(topicoId)}
      });
      return { 'respuesta': curso };
    },

    crearCurso: async(request, response) => {
      const curso = await Curso.create(request.body);
      return { message: "El curso fue creado exitosamente", result: curso};
    },

    editarCurso: async(request, response) => {
        await Curso.update(request.body, { where: { id: request.params.id } });
        let curso = await Curso.findByPk(request.params.id);
        return { message: "El curso fue editado exitosamente", Curso: curso };
    },

    eliminarCurso: async(request, response) => {
      let message='';
      let id = request.params.id;
      const resultado = await Curso.destroy({
        where: { id: request.params.id }
      });
      if(resultado !== 0){
        message= `El curso con id ${request.params.id} fue eliminado correctamente`;
      } 
      else {  
        message= `El curso con id ${request.params.id} no fue encontrado`;
      }
      return {
        message,
        result: resultado,
        id: id,
      };            
    }
}

module.exports = CursoService;