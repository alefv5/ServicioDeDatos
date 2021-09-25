module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'nombre': DataTypes.STRING
    });
    return Estado;
  }
  