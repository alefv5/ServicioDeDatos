'use strict';
const express = require('express');
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const cursoService = require('../app/services/cursoService');
const InscriptoService = require('../app/services/inscriptoService');


router.get(nombresRutas.emptyUrl, async(request, response) => {
    let parametros = request.query;
    const todosLosCursos = await cursoService.encontrarCursos(parametros);
    response.send(todosLosCursos)
});

router.get(
    nombresRutas.emptyUrl + "/:cursoId/inscriptes", 
    async (peticion, respuesta) => {
      try {
        if (Number(peticion.params.cursoId)) {
          const inscriptesDelCurso = await cursoService.encontrarInscriptesDeUnCurso(
            peticion.params.cursoId
          );
          respuesta.status(200).send(inscriptesDelCurso);
        } else {
          respuesta.status(400).send("IdCurso invalido");
        }
      } catch (error) {
        respuesta.status(400).send(error);
      }
    }
  );

router.get("/:id", async (request, response) => {
  try {
    const curso = await cursoService.encontrarCursoPorId(request.params.id);
    response.send(curso);
  } catch (error) {
    response.status(404).send( 'Curso no encontrado' );
  }
});

router.post(nombresRutas.emptyUrl, async(request, response) => {
  try {
    const result = await cursoService.crearCurso(request, response);
    response.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async(request, response) => {
    const result = await cursoService.editarCurso(request, response);
    response.status(200).send(result);
});

router.delete("/:id", async (request, response) => {
  try {
    const result = await cursoService.eliminarCurso(
      request,
      response
    );
    response.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;