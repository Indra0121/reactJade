const express = require('express');
const router = express.Router();
const productController = require('../controllers/Products');

// GET all products
router.get('/products', productController.getAllProducts);

// GET a specific product by ID
router.get('/products/:id', productController.getProductById);

// POST create a new product
router.post('/products', productController.createProduct);

// PUT update a product
router.put('/products/:id', productController.updateProduct);

// DELETE a product
router.delete('/products/:id', productController.deleteProduct);

// GET products by category
router.get('/products/category/:category', productController.getProductsByCategory);

module.exports = router;
