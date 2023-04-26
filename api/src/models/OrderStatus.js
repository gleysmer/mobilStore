const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderStatus', { 
     id: {
    type: DataTypes.INTEGER,
    autoIncrement: true ,
    primaryKey: true,

  },
    // address: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    status: {                          //estado del pedido ej: enviado
      type: DataTypes.ENUM('pending', 'sent'),
      allowNull: false,
    },
  }, { timestamps: false });
};
