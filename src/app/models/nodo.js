module.exports = (sequelize, DataTypes) => {
  const Nodo = sequelize.define('Nodo', {
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    'nombre': DataTypes.STRING
  });
  Nodo.associate = function(models){
    Nodo.hasMany(models.Sede, {as: 'sedes'});
    Nodo.hasMany(models.Curso, { as: 'cursos' });
  };
  return Nodo;
}
