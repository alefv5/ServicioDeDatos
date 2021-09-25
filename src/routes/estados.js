'use strict';
const express = require('express');
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const estadoService = require('../app/services/estadoService');

router.get(nombresRutas.emptyUrl, async(request, response) => {
    const todosLosEstadosDeEstudiantes = await estadoService.encontrarTodosLosEstados(request, response);
    response.send(todosLosEstadosDeEstudiantes);
});

module.exports = router;