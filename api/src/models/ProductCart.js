const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define("productcart", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};