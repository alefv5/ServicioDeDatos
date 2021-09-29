const { Inscripto, Estudiante, Curso, Topico, NivelIngles, Nodo } = require('../models');
const InscriptoService = {

    mostrarInscriptos: async() => {
        let todosLosInscriptos = await Inscripto.findAll({
            attributes: {exclude: ['estudianteId','cursoId']},
            include: [
            {
                model: Estudiante,
                as: 'estudiante',
                attributes: {exclude: ['estudianteId']}
            },
            {
                model: Curso,
                as: 'curso',
                attributes: {exclude: ['cursoId']}
            }],
        });
        return { 'response': todosLosInscriptos };
    },
    
    inscribirVarios: async(request, response) => {
        var inscriptos = request.body;
        var resultado = [];
        var codigo;
        for(const inscripto of inscriptos ){
            let estudiante = await Estudiante.findByPk(inscripto.estudianteId);
            let estaInscripto = await Inscripto.findAll({
                where: {
                    estudianteId: inscripto.estudianteId,
                    cursoId: inscripto.cursoId
                }
            });
            if(estaInscripto.length == 0){
                if(estudiante == null){
                    resultado.push({ Operacion: "El estudiante con id " + inscripto.estudianteId + " no existe"});
                    codigo = 400;
                }
                else{
                    let curso = await Curso.findByPk(inscripto.cursoId);
                    if(curso == null){
                        resultado.push({ Operacion: "El curso con id " + inscripto.cursoId + " no existe"});
                        codigo = 400;
                    }
                    else{
                        var estado = (estudiante.estadoId === 2) ? 5 : 1;
                        var estudianteActualizado = {
                            "nodoId": curso.NodoId,
                            "sedeId": curso.SedeId,
                            "estadoId": estado,
                        }
                        await Estudiante.update(estudianteActualizado, { where: { id: inscripto.estudianteId } });
                        await Inscripto.create(inscripto);
                        resultado.push({ Operacion: "Se registro correctamente"});
                        codigo = 200;
                    }
                }
            }
            else{
                resultado.push({ Operacion: "El estudiante ya se encuentra inscripto a un curso"});
                codigo = 400;
            }     
        }  
        return {message: resultado, result: codigo}; 
    },

    inscribir: async(request, response) => {
        var inscripto = request.body;
        var resultado = [];
        var codigo;
        let estudiante = await Estudiante.findByPk(inscripto.estudianteId);
        console.log(estudiante);
        let estaInscripto = await Inscripto.findAll({
            where: {
                estudianteId: inscripto.estudianteId,
                cursoId: inscripto.cursoId
            }
        });
        if(estaInscripto.length == 0){
            if(estudiante == null){
                resultado.push({ Operacion: "El estudiante con id " + inscripto.estudianteId + " no existe"});
                codigo = 400;
            }
            else{
                let curso = await Curso.findByPk(inscripto.cursoId);
                if(curso == null){
                    resultado.push({ Operacion: "El curso con id " + inscripto.cursoId + " no existe"});
                    codigo = 400;
                }
                else{
                    var estado = (estudiante.estadoId === 2) ? 5 : 1;
                    var estudianteActualizado = {
                        "nodoId": curso.NodoId,
                        "sedeId": curso.SedeId,
                        "estadoId": estado,
                    }
                    await Estudiante.update(estudianteActualizado, { where: { id: inscripto.estudianteId } });
                    await Inscripto.create(inscripto);
                    resultado.push({ Operacion: "Se registro correctamente"});
                    codigo = 200;
                }
            }
        }
        else{
            resultado.push({ Operacion: "El estudiante ya se encuentra inscripto a un curso"});
            codigo = 400;
        }    
        return {message: resultado, result: codigo}; 
    },


    desinscribir:async(request, response) => {  
        var resultado = [];
        var codigo;
        await Inscripto.destroy({ 
            where: { id: request.params.id }
        });                        
        resultado.push({ Operacion: "Se elimino la inscripcion correctamente"});
        codigo = 200;
        return {message: resultado, result: codigo}; 
    },
    
    obtenerCursosPorIdEstudiante: async(idEstudiante) => {
        let todosLosCursosDeEstudiante = await Inscripto.findAll({
            attributes: {exclude: ['estudianteId','cursoId']},
            where: { estudianteId: Number(idEstudiante) },
            include: [
            {
                model: Curso,
                as: 'curso',
                attributes: {exclude: ['cursoId']},
                include: {
                    model: Topico,
                    as: "topico"
                }
            }],
        });
        return { 'response': todosLosCursosDeEstudiante };
    },

    obtenerInscriptosPorIdCurso: async(idCurso) => {
        let todosLosEstudiantesDelCurso = await Inscripto.findAll({
            attributes: {exclude: ['estudianteId','cursoId', "id"]},
            where: { cursoId: Number(idCurso) },
            include: [
            {
                model: Estudiante,
                as: 'estudiante',
                attributes: {exclude: ['nivelInglesId','nodoId']},
                include: [
                    {
                        model: NivelIngles,
                        as: "nivelIngles"
                    },
                    {
                        model: Nodo,
                        as: "nodo"
                    }
                ]
            }],
        });
        return { 'response': todosLosEstudiantesDelCurso };
    }

}

module.exports = InscriptoService;