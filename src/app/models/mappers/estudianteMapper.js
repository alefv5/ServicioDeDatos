'use strict';

const { Sede } = require("../");
const { Nodo } = require("../");
const { NivelIngles } = require('../');
const EstudianteDTO = require("../DTOs/estudianteDTO");

class EstudianteMapper {

    static obtenerDtoDeListaEstudiantes(listaEstudiantes) {
        return listaEstudiantes.map((estudiante) => {
            return new EstudianteDTO(estudiante).obtenerDtoDeEstudiante();
        });
    }

    static async obtenerEstudianteDeDTO(estudianteDTO) {
        let nodoId = null;
        let sedeId = null;
        let nivelInglesId = null;
        const nivelInglesEncontrado = await NivelIngles.findOne({
            where: {
                nombre: estudianteDTO.nivelIngles || null,
            }
        });
        nivelInglesId = nivelInglesEncontrado && nivelInglesEncontrado.id;
        const nodoEncontrado = await Nodo.findOne({
            where: {
                nombre: estudianteDTO.nodo || null,
            }
        });
        if(nodoEncontrado){
            const sedeEncontrada = await nodoEncontrado.getSedes({
                where: {
                    nombre: estudianteDTO.sede || null,
                }
            });
            nodoId = nodoEncontrado.id;
            sedeId = sedeEncontrada && sedeEncontrada[0].id;
        }
        const { nivelIngles, sede, nodo, ...estudianteInfo} = estudianteDTO;
        return { ...estudianteInfo, nivelInglesId, sedeId, nodoId };
    }
}

module.exports = EstudianteMapper;