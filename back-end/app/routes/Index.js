const express = require('express');
const router = express.Router();
const Cart = require('./Cart');
const Order = require('./Order');
const Product = require('./Product');
const Review = require('./Review');
const User = require('./User');
const Auth = require('./Auth');
router.use('/cart', Cart);
router.use('/order', Order);
router.use('/product', Product);
router.use('/review', Review);
router.use('/user', User);
router.use('/auth',Auth)
module.exports = router;
