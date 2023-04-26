const { Router } = require ("express");
const router = Router();

const { updateStockProduct } = require('../../controllers/cartController');

router.put('/', updateStockProduct);


module.exports = router