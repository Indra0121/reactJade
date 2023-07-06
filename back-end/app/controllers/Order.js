const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('user', 'name email').populate('products.product', 'name price');
    
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;
    
    const newOrder = new Order({
      user,
      products,
      totalAmount,
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { user, products, totalAmount } = req.body;
    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        user,
        products,
        totalAmount,
      },
      { new: true }
    );
    
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    
    if (deletedOrder) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
