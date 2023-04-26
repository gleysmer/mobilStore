const { Router } = require ("express");
const router = Router();

const { deleteProductCart } = require('../../controllers/cartController');

router.delete('/', deleteProductCart)

module.exports = router