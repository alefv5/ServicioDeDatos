'use strict'; 
const express = require('express');
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const nodoService = require('../app/services/nodoService');
const sedeService = require('../app/services/sedeService');

router.get(nombresRutas.emptyUrl, async(request, response) => {
    const todosLosNodos = await nodoService.encontrarTodosLosNodos(request, response);
    response.send(todosLosNodos)
});

router.get("/:id/sedes", async(request, response) => {
    try {
        const sedes = await sedeService.encontrarSedesPorNodo({NodoId: request.params.id});
        response.status(200).send(sedes);
    } catch (error) {
        console.log(error);
    }
});

router.put(nombresRutas.emptyUrl, async(request, response) => {
    try {
        const result = await nodoService.actualizarNodo(request, response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});

router.delete(nombresRutas.emptyUrl, async(request, response) => {
    try {
        const result = await nodoService.eliminarNodo(request, response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/sedes/:id', async(request, response) => {
    try {
        const result = await sedeService.eliminarSede(request, response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});

router.put('/sedes/:id', async(request, response) => {
    try {
        const result = await sedeService.actualizarSede(request, response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});


router.post(nombresRutas.emptyUrl, async(request, response) => {
    try {
        const result = await nodoService.crearNodo(request, response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;