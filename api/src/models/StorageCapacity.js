const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo se relaciona con usuarios y productos
  sequelize.define('storageCapacity', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true ,
        primaryKey: true,
      },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });
};