'use strict';

module.exports = {
    emptyUrl: '',
    headquarters: {
        url: '/headquarters',
    },
    nodos: {
        url: '/nodos'
    },
    sedes: {
        url: '/sedes'
    },
    estados: {
        url: '/estados'
    },
    nivelIngles: {
        url: '/nivel-ingles'
    },
    estudiantes: {
        url: '/estudiantes',
        egresades: {
            url: '/egresades',
            desempleados: {
                url: '/desempleados'
            }
        }
    },
    cursos : {
        url: '/cursos',
        inscriptes: {
            url: '/cursos/:cursoId/inscriptes',
            inscripte: {
                url: '/cursos/:cursoId/inscriptes/:inscripteId',
            }
        }
    },
    inscriptos : {
        url: '/inscriptos',
    },
    topicos: {
        url: '/topicos'
    }

};