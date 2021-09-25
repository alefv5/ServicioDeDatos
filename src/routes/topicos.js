'use strict';
const express = require('express');
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const topicoService = require('../app/services/topicoService');


router.get(nombresRutas.emptyUrl,async(reques,response)=>{
    const todosLosTopicos = await topicoService.encontrarTodosLosTopicos();
    response.send(todosLosTopicos);
});

router.get(nombresRutas.emptyUrl+'/:id',async (request, response) => {
    try {
        const topico = await topicoService.encontrarTopicoPorId(request.params.id);
        response.send(topico);
    } catch (error) {
        response.status(404).send( 'Topico no encontrado' );
    }
});

router.post(nombresRutas.emptyUrl, async(request, response) => {
    try {
        const nuevoTopico = await topicoService.crearTopico(request, response);
        response.status(200).send(nuevoTopico);
    } catch (error) {
        console.log(error);
    }
});

router.put("/:id", async(request, response) => {
    const topicoEditado = await topicoService.editarTopico(request, response);
    response.status(200).send(topicoEditado);
});

router.delete("/:id", async (request, response) => {
    try {
      const result = await topicoService.eliminarTopico(
        request,
        response
      );
      response.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;