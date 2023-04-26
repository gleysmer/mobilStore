const { Router } = require("express");
const { Product, Brand, Color, StorageCapacity } = require("../db.js");
const { getAllProducts } = require("../utils/getProducts.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    const products = await getAllProducts();

    if (name) {
      let result = products.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      result.length
        ? res.status(200).send(result)
        : res.status(404).send("name not found");
    } else {
      return res.status(200).send(products);
    }
  } catch (error) {
    console.log(error);
  }
});

// post

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      year,
      brandid,
      image,
      storageCapacityId,
      colorId,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !year ||
      !brandid ||
      !image ||
      !storageCapacityId ||
      !colorId
    ) {
      res.status(400).send("you must complete all fields");
    } else {
      const createProduct = await Product.create({
        image,
        name,
        description,
        price,
        stock,
        year,
        enabled: true,
      });
      // console.log("createProduct es: ", createProduct)
      const brand = await Brand.findOne({
        where: {
          id: brandid,
        },
      });
      // console.log("brand es: ", brand)
      await createProduct.setBrand(brand);

      const color = await Color.findOne({
        where: {
          id: colorId,
        },
      });
      //  console.log("color es: ", color)
      await createProduct.setColor(color);

      const storageCapacity = await StorageCapacity.findOne({
        where: {
          id: storageCapacityId,
        },
      });

      // console.log("storageCapacity es: ", storageCapacity)
      await createProduct.setStorageCapacity(storageCapacity);

      // res.send(createProduct)
      res.status(200).json(createProduct);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//   get por id

router.get("/:id", async (req, res) => {
  const products = await getAllProducts();
  const selected = await products.filter((phone) => phone.id == req.params.id);
  if (selected) {
    res.status(200).send(selected);
  } else {
    res.send("id no existe").status(404);
  }
});


// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   const body = req.body;

//   try {
//     await Product.update(
//       {
//         name: body.name,
//         price: body.price,
//         description: body.description,
//         stock: body.stock,
//         enabled: body.enabled,
//         year: body.year,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     res.status(200).send("Product updated successfully!");
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.put('/:id', async (req, res) => {
  try{
  const selectedProduct = await Product.findOne({
    where: {
      id: req.params.id
    }

  });

  if (selectedProduct) {
    let data = { ...req.body }

    let keys = Object.keys(data);

    keys.forEach(k => {
      selectedProduct[k] = data[k]
    });

    await selectedProduct.save()

    res.status(200).send(selectedProduct)
  } else {
    res.status(404)
  }}catch(error){
    res.status(400).json({error: error.message})
  }
})


router.put('/enabled/:id', async(req,res)=>{
  const { id } = req.params;

      try {
          const product = await Product.findOne({
              where: { id: id }
          })
          if(product.enabled === true){
             await Product.update(
                  { enabled: false },
                  { where: { id: id} }
              )
              res.send('the product is disabled')
          }else{
               await Product.update(
                  { enabled: true },
                  { where: { id: id} }
              )
              res.send('the product is enabled')
          }


      } catch (err) {
          console.log(err)
      }
})
module.exports = router;