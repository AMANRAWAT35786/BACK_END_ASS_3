const express = require('express');
const {
  createProduct,
  getProducts,
  getLowStock,
  getSummary,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);

// specific routes must come before /:id
router.get('/low-stock', getLowStock);
router.get('/summary', getSummary);

router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', updateStock);

module.exports = router;
