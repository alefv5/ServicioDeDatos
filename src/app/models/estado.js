module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Estado', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'nombre': DataTypes.STRING
    });
     
  }
  