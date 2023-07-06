const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Order');

// GET all orders
router.get('/orders', orderController.getAllOrders);

// GET a specific order by ID
router.get('/orders/:id', orderController.getOrderById);

// POST a new order
router.post('/orders', orderController.createOrder);

// PUT update an order
router.put('/orders/:id', orderController.updateOrder);

// DELETE an order
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
