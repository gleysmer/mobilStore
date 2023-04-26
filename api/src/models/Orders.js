const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo se relaciona con usuarios y productos
  sequelize.define('orders', { 
  id: {
    type: DataTypes.STRING,
    // autoIncrement: true ,
    primaryKey: true,
  },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};
