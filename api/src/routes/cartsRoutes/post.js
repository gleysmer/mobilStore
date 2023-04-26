const { Router } = require ("express");
const router = Router();

const { addProductCart } = require('../../controllers/cartController');

router.post('/', addProductCart);


module.exports = router