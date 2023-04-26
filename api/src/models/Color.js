const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo se relaciona con usuarios y productos
  sequelize.define('color', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true ,
        primaryKey: true,
      },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};