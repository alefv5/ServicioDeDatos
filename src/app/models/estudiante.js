module.exports = (sequelize, DataTypes) => {
    const Estudiante = sequelize.define('Estudiante', {
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        'dni': DataTypes.STRING,
        'tipoDNI': DataTypes.STRING,
        'nombre': DataTypes.STRING,
        'apellido': DataTypes.STRING,
        'nacionalidad': DataTypes.STRING,
        'fechaNacimiento': DataTypes.DATE,
        'correo': DataTypes.STRING,
        'correoOpcional': DataTypes.STRING,
        'celular': DataTypes.STRING,
        'linkedin': DataTypes.STRING,
        'zona': DataTypes.STRING,
        'detalle': DataTypes.STRING,
        'añoGraduacion': DataTypes.INTEGER,
        'topico': DataTypes.STRING,
        'periodo': DataTypes.INTEGER,
        'profesor': DataTypes.STRING,
        'nombrePrimerTrabajo': DataTypes.STRING,
        'trabajaActualmente': DataTypes.BOOLEAN,
        'trabajaSistemas': DataTypes.STRING,
        'experienciaSistemas': DataTypes.STRING,
        'estudiosSistemas': DataTypes.STRING,
        'fechaActualTrabajo': DataTypes.DATE,
        'lugarActualTrabajo': DataTypes.STRING,
        'fechaPrimerEmpleo': DataTypes.DATE,
        'nivelInglesId': DataTypes.INTEGER,
        'estadoId': DataTypes.INTEGER,
        'sedeId': DataTypes.INTEGER,
        'nodoId': DataTypes.INTEGER,
    });
    Estudiante.associate = function(models) {
        Estudiante.belongsTo(models.Sede, { foreignKey: 'sedeId', as: 'sede' }),
        Estudiante.belongsTo(models.Nodo, { foreignKey: 'nodoId', as: 'nodo' }),
        Estudiante.belongsTo(models.Estado, { foreignKey: 'estadoId', as: 'estado' }),
        Estudiante.belongsTo(models.NivelIngles, { foreignKey: 'nivelInglesId', as: 'nivelIngles' })

    };
    return Estudiante;
}