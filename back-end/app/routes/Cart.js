const express = require("express");
const CartController = require("../controllers/Cart");
const router = express.Router();

router.get("/carts", CartController.getAllCart);
router.get("/carts/:id", CartController.getOneCart);
router.put("/carts/:userId/products/:productId", CartController.updateCart);
router.post('/carts/:userId', CartController.addToCart);
router.delete("/carts/:id/products/:productId", CartController.removeFromCart);

module.exports = router;
