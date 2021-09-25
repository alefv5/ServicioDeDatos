module.exports = (sequelize, DataTypes) => {
    const Topico = sequelize.define('Topico', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'nombre': DataTypes.STRING,
    }, {});
    Topico.associate = function(models){
      Topico.hasMany(models.Curso, { as: 'cursos' });
    };
    return Topico;
}