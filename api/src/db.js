require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  Url,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env;

 const sequelize = new Sequelize(Url, {
   logging: false, // set to console.log to see the raw SQL queries
   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
 });

 /*const sequelize = new Sequelize(`postgres://postgres:123@localhost/PHONEZONE_DB`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}); */

  /*const sequelize = new Sequelize("postgresql://postgres:vcxNeXuplzneHbVIiZJo@containers-us-west-193.railway.app:6542/railway", {
   logging: false, // set to console.log to see the raw SQL queries
   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
 });*/

//  const sequelize = new Sequelize(`postgresql://postgres:vcxNeXuplzneHbVIiZJo@containers-us-west-193.railway.app:6542/railway`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets S)equelize know we can use pg-native for ~30% more speed
// })

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Brand, User, Orders, OrderStatus, Review, Detail, Color, StorageCapacity, Wishlist, Cart, Productcart } = sequelize.models;

// Aca vendrian las relaciones

Brand.hasOne(Product)
Product.belongsTo(Brand)

Color.hasOne(Product)
Product.belongsTo(Color)
//
StorageCapacity.hasOne(Product)
Product.belongsTo(StorageCapacity);

User.belongsToMany(Product, {through: "product_user"});
Product.belongsToMany(User, {through: "product_user"});

Product.hasMany(Review);
Review.belongsTo(Product);


User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User);

Orders.hasOne(OrderStatus);
OrderStatus.belongsTo(Orders);

Product.belongsToMany(Orders, {through: Detail });
Orders.belongsToMany(Product, {through: Detail });

// Detail.belongsTo(Product, { foreignKey: "productId" });
// Detail.belongsTo(Orders, { foreignKey: "orderId" });

Cart.hasOne(User);
User.belongsTo(Cart);

User.belongsToMany(Product, {through: Wishlist});
Product.belongsToMany(User, {through: Wishlist})

Cart.belongsToMany(Product, { through: "cart_product" });
Product.belongsToMany(Cart, { through: "cart_product" });


Cart.hasMany(Productcart);
Productcart.belongsTo(Cart);


Product.hasMany(Productcart);
Productcart.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
