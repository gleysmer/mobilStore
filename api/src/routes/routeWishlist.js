const { Router } = require("express");

const router = Router();

const {
    User,
    Product,
    Wishlist
  } = require("../db.js");
const { route } = require("./productsRoute.js");

router.post('/', async (req, res) => {
    try {
        const { idUser, idProduct } = req.body

        const product = await Product.findOne({
            where: {
                id: idProduct
            }
        }) 

        const user = await User.findOne({
            where: {
                id: idUser
            }
        })

        const [wish, created] = await Wishlist.findOrCreate({
            where: {
                userId: user.id,
                productId: product.id
            }
        })

        created ? res.status(200).json({message: 'The product was successfully added to your wish list'}) :
                  res.status(400).json({message: 'The product is already in your wish list'})
        

    }catch(error){
        res.status(400).json({error: error.message})
    }
});

router.get('/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;

        const wish = await Wishlist.findAll({
            where: {
                userId: idUser
            }
        })
        // console.log("wish es ", wish)
        const products = [];


        await Promise.all(
            wish.map(async (element) => {
        
                const product = await Product.findAll({
                    where: {
                        id: element.productId
                    }
                })  
                // console.log(product)
                products.push(product)
            })
        )
        // console.log("Products es: ", products)
        let listaDeFavoritos = products.flat().map((element) => {
            return {
                id: element.id,
                name: element.name,
                image: element.image,
                price: element.price,
            }
        })
        // console.log("products es: ", products)
        res.status(200).json(listaDeFavoritos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/:idUser/:idProduct', async (req, res) => {
    try {
        const { idUser, idProduct } = req.params;

        const deleted = await Wishlist.destroy({
            where: {
                userId: idUser,
                productId: idProduct
            }
        })
        res.status(200).json({message: 'The product has been removed from your wish list'})
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

module.exports = router;