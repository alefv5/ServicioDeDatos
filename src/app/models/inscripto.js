module.exports = (sequelize, DataTypes) => {
  const Inscripto = sequelize.define('Inscripto', {
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    'estudianteId': DataTypes.INTEGER,
    'cursoId': DataTypes.INTEGER,
  });
  Inscripto.associate = function(models){
    Inscripto.belongsTo(models.Estudiante, {foreignKey: 'estudianteId', as: 'estudiante'});
    Inscripto.belongsTo(models.Curso, { foreignKey: 'cursoId', as: 'curso' });
  };
  return Inscripto;
}