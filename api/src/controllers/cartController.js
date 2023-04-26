const Sequelize = require('sequelize');

const  { User, Cart, Productcart, Product, Brand  }  = require("../db")

const updateTotalValue = async (cart) => {

    let loadedProducts = await Productcart.findAll({where: { cartId: cart.id}});
    let totalCart = await loadedProducts.map(e => e.totalValue).reduce((a,b)=> a+b,0);

    return await cart.update({ priceCart: totalCart});
}

const addProductCart = async(req, res) => {

    try {
        const { productId, userId} = req.body;

        let user = await User.findOne({
            where: { id: userId}
        })

        let product = await Product.findOne({
            where: { id: productId}
        })

        let brand = await Brand.findOne({
            where: { id: product.brandId }
        })

        let cart = null;
        
        if(!user.cartId) {
            cart = await Cart.create({ priceCart: product.price, id: userId });
            await user.update({ cartId: userId});
        }else {
        
            cart = await Cart.findOne({
                where: { id: user.cartId },
                include: { model: Productcart}
            });
        }    

        let findProduct = await cart.productcarts?.find(e => e.productId == productId);
        if(findProduct){
            return res.status(400).send({message: 'The product is already in your cart'});
        }else {
            let totalValue = product.price;
            await Productcart.create({
                quantity:1,
                totalValue,
                cartId: cart.id,
                productId: product.id,
                name:product.name,
                img:product.image,
                brand: brand.name,
                priceProduct:product.price
            });

            await updateTotalValue(cart);
            
            return res.status(200).send({message: 'The product was added to your cart'});
        }

    } catch (err) {
        console.log(err)
    }
} 

const deleteProductCart = async (req, res) => {

        const { productId, userId } = req.body

        
        let productCart = await Productcart.findOne({
        where: { cartId: userId, 
                 productId: productId
        }
        });

        if(!productCart){
            res.status(404).send("no se puede eliminar un producto que no agregaste tonto ")
        }

        await productCart.destroy();

        const cart = await Cart.findOne({ where: { id: userId} })

        updateTotalValue(cart); 
    res.status(200).send({message: 'The product was removed from your cart'})
};

const updateStockProduct = async (req, res) => {

    const { userId, productId, operator } = req.body;

    // BUSCAMOS EL STOCK DEL PRODUCTO AL CUÁL LE APLICAREMOS EL UPDATE.

    const product = await Product.findOne({
        where: { id: productId }
    })

    const price = product.price;
    const stock = product.dataValues.stock;

    // BUSCAMOS LA CANTIDAD DE STOCK QUE TENEMOS DE ESE PRODUCTO.

    var productCart = await Productcart.findOne({
        where: { cartId: userId, productId: productId}
    })

    const quantity = productCart.dataValues.quantity;

    let response = null;

    if(operator === '+'){
        if(quantity >= stock){
            response = res.status(400).send({message: 'You cannot exceed the stock of a product'});
        } else {
            await Productcart.update(
                { 
                    quantity: Sequelize.literal('quantity + 1'),
                    totalValue: Sequelize.literal('"totalValue" + "priceProduct"')
                },
                { 
                    where: { cartId: userId, productId: productId} 
                }
            );
            
            await Cart.update(
                {
                    priceCart: Sequelize.literal(`"priceCart" + ${price}`)
                },
                { 
                where: { id: userId} }
            )
            
            response = res.status(200).send({message: 'all good!'});
        }        
    }else{

        if(quantity <= 1){
            response = res.status(400).send({message: 'You cannot have negative stock'});
        } else {
            await Productcart.update(
                { 
                    quantity: Sequelize.literal('quantity - 1'),
                    totalValue: Sequelize.literal('"totalValue" - "priceProduct"')
                },
                { 
                    where: { cartId: userId, productId: productId} 
                }
            );

            await Cart.update(
                {
                    priceCart: Sequelize.literal(`"priceCart" - ${price}`)
                },
                { 
                where: { id: userId} }
            )

            response = res.status(200).send({message: 'all good!'});
        }
    }

    
    
    return response;           
}


module.exports = { addProductCart, deleteProductCart, updateTotalValue, updateStockProduct}