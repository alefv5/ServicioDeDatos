module.exports = (sequelize, DataTypes) => {
    const Sede = sequelize.define('Sede', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'nombre': DataTypes.STRING,
      'NodoId': DataTypes.INTEGER
    }, {});
    Sede.associate = function(models){
      Sede.belongsTo(models.Nodo, {foreignKey: 'NodoId', as: 'nodo'});
      Sede.hasMany(models.Curso, { as: 'cursos' });
    };
    return Sede;
}
    