module.exports = (sequelize, DataTypes) => {
  
  return sequelize.define('NivelIngles', {
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    'nombre': DataTypes.STRING
  });
}
