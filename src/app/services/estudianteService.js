const { Estudiante } = require("../models");
const { Sede } = require("../models");
const { Estado } = require("../models");
const { NivelIngles } = require("../models");
const EstudianteDTO = require("../models/DTOs/estudianteDTO");
const Sequelize = require("sequelize");
const { nivelIngles } = require("../../resources/nombresRutas");
const EstudianteMapper = require("../models/mappers/estudianteMapper");
const { Nodo } = require("../models");
const InscriptoService = require('../services/inscriptoService');
const cursoService = require('../services/cursoService');
const topicoService = require('../services/topicoService');

const EstudianteService = {
  encontrarEstudiantes: async parameters => {
    const Op = Sequelize.Op;
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEstudiantes = await Estudiante.findAll({
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ],
      where: parameters
    });
    todosLosEstudiantes = todosLosEstudiantes.map(x => x.dataValues);
    return { response: todosLosEstudiantes };
  },

  encontrarEstudiantesDTO: async parameters => {
    const Op = Sequelize.Op;
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEstudiantes = await Estudiante.findAll({
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ],
      where: parameters
    });
    todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(
      todosLosEstudiantes
    );
    return { response: todosLosEstudiantes };
  },

  encontrarEgresadePorId: async estudianteId => {
    let egresade = await Estudiante.findByPk(estudianteId, {
      where: {
        estadoId: 2
      },
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ]
    });
    return { response: egresade };
  },

  encontrarEgresadePorIdDTO: async estudianteId => {
    let egresade = await Estudiante.findByPk(estudianteId, {
      where: {
        estadoId: 2
      },
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ]
    });
    let estudianteDTO = new EstudianteDTO(egresade);
    return { response: estudianteDTO.obtenerDtoDeEstudiante() };
  },

  encontrarEstudiantePorId: async estudianteId => {
    let egresade = await Estudiante.findByPk(estudianteId, {
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ]
    });
    return { response: egresade };
  },

  encontrarEstudianteDTOPorId: async estudianteId => {
    let egresade = await Estudiante.findByPk(estudianteId, {
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ]
    });
    let estudianteDTO = new EstudianteDTO(egresade);
    return { response: estudianteDTO.obtenerDtoDeEstudiante() };
  },

  registrarEstudiantesEgresades: async (request, response) => {
    var estudiantes = request.body;

    estudiantes.forEach(async estudiante => {
      await Estudiante.count({
        where: { nombre: estudiante.nombre, apellido: estudiante.apellido }
      }).then(async count => {
        if (count != 0) {
          await Estudiante.update(estudiante, {
            where: {
              nombre: estudiante.nombre,
              apellido: estudiante.apellido,
              estadoId: 2
            }
          });
        } else {
          await Estudiante.create(estudiante, {
            where: {
              estadoId: 2
            }
          });
        }
      });
    });
    return 200;
  },

  importarListaEgresadesDTO: async (request, response) => {
    const estudiantesDTO = request.body;
    const estudiantes = await Promise.all(
      estudiantesDTO.map(async estudianteDTO => {
        if (estudianteDTO.fechaPrimerEmpleo == "" || estudianteDTO.fechaPrimerEmpleo == null) {
          estudianteDTO.estadoId = 2;
        } else {
          estudianteDTO.estadoId = 3;
        }
        return await EstudianteMapper.obtenerEstudianteDeDTO(estudianteDTO);
      })
    );
    await Estudiante.bulkCreate(estudiantes, { validate: true });
    return 200;
  },

  actualizarEstudiante: async (request, response) => {
    let body = {}
    if (request.body.estadoId !== 1) {
      if (request.body.trabajaActualmente === true)
        body = { ...request.body, estadoId: 3 }
      else
        body = { ...request.body, estadoId: 2 }
    }
    else
      body = { ...request.body, estadoId: 1 }

    await Estudiante.update(body, {
      where: { id: request.params.id }
    });
    let estudiante = await Estudiante.findByPk(request.params.id);
    return {
      message: "El estudiante fue actualizado exitosamente",
      Estudiante: estudiante
    };
  },

  crearEstudiante: async (request, response) => {
    const estudiante = request.body;
    let resultado = "";
    await Estudiante.count({
      where: { nombre: estudiante.nombre, apellido: estudiante.apellido }
    }).then(async count => {
      if (count != 0) {
        resultado = await Estudiante.update(estudiante, {
          where: {
            nombre: estudiante.nombre,
            apellido: estudiante.apellido
          }
        });
      } else {
        resultado = await Estudiante.create(estudiante);
      }
    });
    return {
      message: "El estudiante fue creado exitosamente",
      result: resultado
    };
  },

  eliminarEstudiante: async (request, response) => {
    const resultado = await Estudiante.destroy({
      where: { id: request.params.id }
    });
    return {
      message: "El Estudiante  fue eliminado exitosamente",
      result: resultado
    };
  },

  encontrarEstudiantesEgresades: async parameters => {
    const Op = Sequelize.Op;
    const pagina = parameters.pagina - 1;
    delete parameters.pagina;
    const criterioDeOrden = parameters.ordenarPor || "id";
    delete parameters.ordenarPor;
    const sentidoDeOrden = criterioDeOrden === "añoGraduacion" ? "DESC" : "ASC";
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEgresadesPorNombre = await Estudiante.findAll({
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ],
      offset: pagina * 10,
      limit: 10,
      where: parameters,
      order: [[criterioDeOrden, sentidoDeOrden]]
    });
    return { response: todosLosEgresadesPorNombre };
  },

  encontrarEstudiantesEgresadesDTO: async parameters => {
    const Op = Sequelize.Op;
    const pagina = parameters.pagina - 1;
    delete parameters.pagina;
    const criterioDeOrden = parameters.ordenarPor || "id";
    delete parameters.ordenarPor;
    const sentidoDeOrden = criterioDeOrden === "añoGraduacion" ? "DESC" : "ASC";
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEstudiantes = await Estudiante.findAll({
      where: {
        parameters,
        estadoId: 2
      },
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ],
      offset: pagina * 10,
      limit: 10,
      order: [[criterioDeOrden, sentidoDeOrden]]
    });
    todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(
      todosLosEstudiantes
    );
    return { response: todosLosEstudiantes };
  },

  encontrarEgresadesSinPaginacion: async parameters => {
    const Op = Sequelize.Op;
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEgresadesPorNombre = await Estudiante.findAll({
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ],
      where: {
        [Op.or]: [{ estadoId: 2 }, { estadoId: 3 }, { estadoId: 5 }]
      },
    });
    return { response: todosLosEgresadesPorNombre };
  },

  encontrarEgresadesSinPaginacionDTO: async parameters => {
    const Op = Sequelize.Op;
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEstudiantes = await Estudiante.findAll({
      where: {
        [Op.or]: [{ estadoId: 2 }, { estadoId: 3 }, { estadoId: 5 }]
      },
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ],
      //where: parameters
    });
    todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(
      todosLosEstudiantes
    );
    return { response: todosLosEstudiantes };
  },

  encontrarEgresadesDesempleadosSinPaginacionDTO: async parameters => {
    const Op = Sequelize.Op;
    if ("nombre" in parameters && "apellido" in parameters) {
      parameters.nombre = {
        [Op.startsWith]: parameters.nombre
      };
      parameters.apellido = {
        [Op.startsWith]: parameters.apellido
      };
    }
    let todosLosEstudiantes = await Estudiante.findAll({
      where: {
        [Op.and]: [parameters],
        [Op.or]: [{ estadoId: 2 }, { estadoId: 5 }]
      },
      attributes: { exclude: ["sedeId", "nodoId", "nivelInglesId"] },
      include: [
        {
          model: Sede,
          as: "sede",
          attributes: { exclude: ["NodoId"] }
        },
        {
          model: Nodo,
          as: "nodo",
          include: {
            model: Sede,
            as: "sedes",
            attributes: { exclude: ["NodoId"] }
          }
        },
        {
          model: Estado,
          as: "estado"
        },
        {
          model: NivelIngles,
          as: "nivelIngles"
        }
      ]
    });
    todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(
      todosLosEstudiantes
    );
    if (parameters.topico) {
      todosLosTopicos = await topicoService.encontrarTodosLosTopicos();
      todosLosTopicos = todosLosTopicos.response.filter(topico => topico.nombre == parameters.topico);
      const topicoId = todosLosTopicos[0].id
      const cursos = await cursoService.encontrarCursosPorTopicoId(topicoId);
      let estudiantes = [];
      for (let i = 0; i < cursos.respuesta.length; i++) {
        const inscriptes = await InscriptoService.obtenerInscriptosPorIdCurso(cursos.respuesta[i].id);
        estudiantes = estudiantes.concat(inscriptes.response);
      }
      let resultadoEstudiantes = todosLosEstudiantes;
      estudiantes.forEach(estudiante => {
        let existe = false;
        todosLosEstudiantes.forEach(est => {
          if (estudiante.id === est.id) {
            existe = true;
          }
        })
        if (!existe) {
          const { nivelIngles, nodo, ...estudianteParseado } = estudiante.estudiante.dataValues;
          let estudianteAGuardar = { ...estudianteParseado };
          estudianteAGuardar.nodo = nodo.nombre;
          estudianteAGuardar.nivelIngles = nivelIngles.nombre;
          resultadoEstudiantes.push(estudianteAGuardar);
        }
      });
      return { response: resultadoEstudiantes };
    }
    return { response: todosLosEstudiantes };
  },

  cambiarEstadoAlumnes: async (solicitud, respuesta) => {
    var estudiantes = solicitud.body.estudiantes;
    var estado = solicitud.body.estado;
    var resultado = [];
    let codigo = 200;
    for (const estudiante of estudiantes) {
      let estudianteEncontrado = await Estudiante.findByPk(estudiante.id);
      if (estudianteEncontrado === null) {
        resultado.push({
          Operacion: "El estudiante con id " + estudiante.id + " no existe"
        });
        codigo = 400;
      } else {
        estado = (estudianteEncontrado.estadoId === 5 && estado === 4) ? 2 : estado;
        estudianteActualizado = {
          id: estudiante.id,
          estadoId: estado
        };
        await Estudiante.update(estudianteActualizado, {
          where: { id: estudianteEncontrado.id }
        });
        resultado.push({
          Operacion:
            "Se cambio el estado correctamente de estudiante: " +
            estudianteEncontrado.nombre +
            " " +
            estudianteEncontrado.apellido
        });
        codigo = 200;

      }
    }
    return { message: resultado, result: codigo };
  }
};

module.exports = EstudianteService;