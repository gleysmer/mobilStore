const { Router } = require("express");
const { Op, where } = require("sequelize");
const mercadopago = require("mercadopago");
// const {sendEmail, sendEmailOrderSent} = require("../utils/notifications");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const ACCESS_TOKEN_MP =
  "APP_USR-921942326134673-041309-7971cc2e2ff43d9017f0a3bb60ac3d1d-1327836042";
const { crearOrden } = require("../utils/ordersSave");
const {
  sendConfirmedPaymentEmail,
  sendEmailOrderSent,
} = require("../utils/notifications");
const BACK_URL = process.env.BACK_URL;

const router = Router();
router.use(bodyParser.urlencoded({ extended: false }));
//agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

const {
  User,
  Orders,
  Product,
  OrderStatus,
  Detail,
  Cart,
  Productcart,
} = require("../db.js");

router.post("/", async (req, res) => {
  const { userId, address } = req.body;

  var sucessUrl;

  let preference = {
    items: [],
    back_urls: {
      success: sucessUrl,
      failure: `${process.env.BACK_URL}/orders/pago-fallido`,
      pending: `${process.env.BACK_URL}/orders/pago-pendiente`,
    },
    auto_return: "approved",
    binary_mode: true,
  };

  // BUSCAMOS EN LA DB TODOS LOS PRODUCTOS QUE TIENE EN SU CARRITO.

  const products = await Productcart.findAll({
    where: { cartId: userId },
  });

  const cart = await Cart.findOne({
    where: { id: userId },
  });

  await Promise.all(
    products.map(async (product, index) => {
      preference.items[index] = {
        title: product.name,
        picture_url: product.img,
        currency_id: "ARS",
        //description: product.description,
        quantity: product.quantity,
        unit_price: parseFloat(product.priceProduct),
      };
    })
  );

  let [cantidades, precios, titulos, fotos] = preference.items
    .map((product) => [
      product.quantity,
      product.unit_price,
      product.title,
      product.picture_url,
    ])
    .reduce(
      (prev, curr) => [
        [...prev[0], curr[0]],
        [...prev[1], curr[1]],
        [...prev[2], curr[2]],
        [...prev[3], curr[3]],
      ],
      [[], [], [], []]
    )
    .map((arr) => arr.join(","));

  let idProducts = products.map((e) => e.productId).join(",");

  const URL = `${BACK_URL}/orders/pago-confirmado?idUser=${userId}&quantity=${cantidades}
    &price=${precios}&total=${cart.priceCart}&idProduct=${idProducts}&address=${address}
    &title=${titulos}&img=${fotos}`;

  let cadenaCantidades = cantidades.split(",");
  let cadenaProductos = idProducts.split(",");
  let stock = true;

  for (let i = 0; i < cadenaProductos.length; i++) {
    const product = await Product.findOne({
      where: {
        id: parseInt(cadenaProductos[i]),
      },
    });

    if (product.stock < cadenaCantidades[i]) {
      stock = false;
      // res.status(400).json({ error: 'No hay stock para el producto' }); // no hay stock para un producto determinado
    }
  }

  if (stock) {
    preference.back_urls.success = URL;

    const response = await mercadopago.preferences.create(preference);

    res.status(200).json({
      init_point: response.body.init_point,
      items: response.body.items,
    });
  } else {
    res.status(400).json({
      error: `No hay stock, actualice la página para ver el nuevo stock`,
      success: false,
    });
  }
});

router.get("/pago-fallido", async (req, res) => {
  res.status(200).json({ msg: "pago fallido" });
});

router.get("/pago-pendiente", async (req, res) => {
  res.status(200).json({ msg: "pago pendiente" });
});

router.get("/pago-confirmado", async (req, res) => {
  const {
    idUser,
    quantity, // este
    price, // este
    total,
    idProduct, // este
    address,
    title, // este
    img,
    //picture_url, // este
    description, // este

    collection_id, //: '56501258558',
    collection_status, //: 'approved',
    payment_id, //: '56501258558',
    status, //: 'approved',
    external_reference, //: 'null',
    payment_type, //: 'account_money',
    merchant_order_id, //: '8525169650',
    preference_id, //: '1325421814-aa67f6ba-8971-4960-855b-639c94320886',
    site_id, //: 'MLA',
    processing_mode, //: 'aggregator',
    merchant_account_id, //: 'null'
  } = req.query;

  // BORRAMOS EL CARRITO DEL USUARIO.

  await Productcart.destroy({ where: { cartId: idUser } });
  await Cart.destroy({ where: { id: idUser } });

  let cadenaCantidades = quantity.split(","); // ['1','2','1']
  let cadenaPrecios = price.split(","); // ['20.5','12....]
  let cadenaProductos = idProduct.split(",");
  let cadenaTitulos = title.split(",");
  //let cadenaPicture = picture_url.split(",");

  let totalDeRegistros = cadenaCantidades.length;

  let nuevaOrden = await crearOrden(
    cadenaCantidades,
    cadenaPrecios,
    cadenaProductos,
    cadenaTitulos,
    //cadenaPicture,
    totalDeRegistros,
    img,
    address,
    collection_id,
    preference_id,
    quantity,
    price,
    idUser,
    total,
    title,
    //picture_url,
    description
  );

  if (!nuevaOrden) {
    res.status(400).send({ error: `No hay stock para el producto` });
  }

  await sendConfirmedPaymentEmail(
    idUser,
    cadenaCantidades,
    cadenaPrecios,
    cadenaTitulos
  );
  const filePath = path.join(__dirname, "../utils/success.html");
  res.sendFile(filePath);
  // res.status(200).json({ msg: "pago confirmado" });
});

router.put("/sendOrder/:idOrder", async (req, res) => {
  try {
    const { idOrder } = req.params;

    const selectedOrder = await Orders.findOne({
      where: {
        id: idOrder,
      },
    });

    if (selectedOrder) {
      const statusOfSelectOrder = await OrderStatus.findOne({
        where: {
          orderId: idOrder,
        },
      });

      if (statusOfSelectOrder.status === "pending") {
        statusOfSelectOrder.status = "sent";
        await statusOfSelectOrder.save();
        sendEmailOrderSent(selectedOrder.userId);
      }

      res.status(200).json(statusOfSelectOrder);
    } else {
      res.status(404).json({ msg: `Orden ${idOrder} inexistente` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/status", async (req, res) => {
  try {
    const { statusOrder } = req.query;

    // console.log("statusOrder es: ", statusOrder)
    if (statusOrder) {
      const orders = await Orders.findAll({
        include: [
          {
            model: OrderStatus,
            where: {
              status: statusOrder,
            },
          },
        ],
      });
      res.status(200).json(orders);
    } else {
      console.log("entra aca");
      const orders = await Orders.findAll({
        include: [
          {
            model: OrderStatus,
          },
        ],
      });
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/order/:idUser", async (req, res) => {

  try {
    const { idUser } = req.params;
    if (idUser) {
      const order = await Orders.findAll({
        include: {
          model: User,
        },
        include: {
          model: Product,
        },
        where: {
          userId: idUser,
        },
      });
      if (order.length) {
        const status = await OrderStatus.findAll();
        const detail = await Detail.findAll({
          where: {
            orderId: order[0].id,
          },
        });

        const data = await order?.map((p) => {
          return {
            Nro: p.id,
            date: p.date,
            address: p.address,
            status: p.orderStatus,
            image: p.products.map((e) => e.image),
            nameAndQuantity: p.products.map((e) => {
              return e.name
                .concat(" (", e.detail.quantity, ") unit/s ")
                .concat(" Unit Price: $", e.detail.price);
            }),
            total: p.total,
            status: status
              .filter((s) => s.orderId == p.id)
              .map((e) => e.status),
          };
        });
        data.length
          ? res.status(200).send(data)
          : res.status(400).send("This user has no associated purchases");
      } else {
        res.status(400).send("This user has no associated purchases");
      }
    } else {
      console.log("entra");
      const order = await Orders.findAll({
        include: {
          model: User,
        },
        include: {
          model: Product,
        },
      });
      if (order.length) {
        const status = await OrderStatus.findAll();
        // const detail = await Detail.findAll({
        //   where: {
        //     orderId: order[0].id,
        //   },
        // });

        const data = await order?.map((p) => {
          return {
            Nro: p.id,
            date: p.date,
            address: p.address,
            status: p.orderStatus,
            image: p.products.map((e) => e.image),
            nameAndQuantity: p.products.map((e) => {
              return e.name
                .concat(" (", e.detail.quantity, ") unit/s ")
                .concat(" Unit Price: $", e.detail.price);
            }),
            total: p.total,
            status: status
              .filter((s) => s.orderId == p.id)
              .map((e) => e.status),
          };
        });
        data.length
          ? res.status(200).send(data)
          : res.status(400).send("This user has no associated purchases");
      } else {
        res.status(400).send("This user has no associated purchases");
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { fechaInicio, fechaFin, status } = req.query;

    let order;
   //---- sin estado /con fechas 
    if (fechaInicio && fechaFin && !status) {
      order = await Orders.findAll({
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
          },
        ],
        where: {
          date: {
            [Op.between]: [fechaInicio, fechaFin],
          },
        },
      })
      return res.status(200).send(order);   
    }
    //------solo fecha de inicio
    if (fechaInicio && !fechaFin && !status) {
      order = await Orders.findAll({
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
          },
        ],
        where: {
          date: {
            [Op.gte]: fechaInicio,
          },
        },
      });
      return res.status(200).send(order);
    }
    //----solo fecha de fin
    if (!fechaInicio && fechaFin && !status) {
      order = await Orders.findAll({
        where: {
          date: {
            [Op.lte]: fechaFin,
          },
        },
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
          },
        ],
      })
      return res.status(200).send(order)   
    }
    //----solo estado
    if (!fechaInicio && !fechaFin && status) {
      order = await Orders.findAll({
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
            where:{
              status:status
            }
            ,
          },
        ],
      })
      return res.status(200).send(order)
    }
    //------con estado y fechas
    if (fechaInicio && fechaFin && status) {
      order = await Orders.findAll({
        where: {
          date: {
            [Op.between]: [fechaInicio, fechaFin],
          },
        },
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
            where:{
              status:status
            }
            ,
          },
        ],
      })
      return res.status(200).send(order)
          
    }
    //----- con estado y fecha de inicio
    if (fechaInicio && !fechaFin && status) {
      order = await Orders.findAll({
        where: {
          date: {
            [Op.gte]: fechaInicio,
          },
        },
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
            where:{
              status:status
            }
            ,
          },
        ],
      })
      return res.status(200).send(order)
    }
   // ----con estado y fecha de fin
    if (!fechaInicio && fechaFin && status) {
      order = await Orders.findAll({
        where: {
          date: {
            [Op.lte]: fechaFin,
          },
        },
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status'],
            where:{
              status:status
            }
            ,
          },
        ],
      })
      return res.status(200).send(order)
    }
 // ----- sin nada TRAE todo
    if (!fechaInicio && !fechaFin) {
      order = await Orders.findAll({
        include: [
          {
            model: User,
            attributes: ['name','surname','email']
          },
          {
            model: OrderStatus,
            attributes: ['status']
            ,
          },
        ],
      })
    }
    order.length?
     res.status(200).send(order)
    : res.status(400).send("This user has no associated purchases");
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
