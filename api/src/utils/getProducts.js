const { Product, Color, StorageCapacity, Review, Brand } = require("../db.js");

const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Color,
        },
        {
          model: StorageCapacity,
        },
        {
          model: Review,
        },
        {
          model: Brand,
        },
      ],
    });
    return products;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllProducts };
