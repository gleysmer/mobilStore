const { Router } = require("express");
const router = Router();

const { User, Cart, Productcart } = require("../../db");

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  const cart = await Cart.findOne({
      include: [
        {
          model: User,
          where: { id: id },
        },
        {
          model: Productcart,
        },
      ],
      order: [[Productcart, "createdAt", "DESC"]],
    });

    /*cart.productcarts = await Productcart.findAll({
      where: { cartId: id }
    })*/

    if(!cart || cart.productcarts.length === 0) return res.status(400).send([])
    else return res.status(200).send(cart);
    
      
    //if(cart.productcarts.length === 0) return res.status(400).send([]);
  
});

module.exports = router;