'use strict';
const express = require('express');
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const sedeService = require('../app/services/sedeService');


router.post(nombresRutas.emptyUrl, async(request, response) => {
    try {
        const result = await sedeService.crearSede(request, response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});

router.get(nombresRutas.emptyUrl, async(request, response) => {
    const sedes = await sedeService.encontrarTodasLasSedes(request, response);
    response.send(sedes)
});

module.exports = router;