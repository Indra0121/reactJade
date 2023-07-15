const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user_id")
      .populate("products.product_id");
    res.status(200).json({
      message: "Carts retrieved successfully",
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getOneCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.id })
      .populate("products.product_id")
      .exec();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({
      msg: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const { quantity } = req.body;

    const existingProduct = cart.products.find(
      (product) => product.product_id== productId
    );

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    const productDoc = await Product.findById(productId);

    if (!productDoc) {
      return res.status(404).json({ error: "Product not found" });
    }

    const maxQuantity = productDoc.quantity;
    existingProduct.quantity = Math.min(quantity, maxQuantity);

    // Calculate the total amount
    let totalAmount = 0;
    for (const product of cart.products) {
      const productDoc = await Product.findById(product.product_id);
      if (productDoc) {
        totalAmount += productDoc.price * product.quantity;
      }
    }
    cart.totalAmount = totalAmount;

    const updatedCart = await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Function to calculate the quantity
const calculateQuantity = (existingQuantity, newQuantity) => {
  return parseInt(existingQuantity) + parseInt(newQuantity);
};

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity, user_id } = req.body;

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = new Cart({
        user_id,
        products: [],
        totalAmount: 0,
      });
    }

    // Check if product already exists in cart
    const existingProduct = cart.products.find(
      (product) => product.product_id == product_id
    );

    if (existingProduct) {
      // Update quantity using the calculateQuantity function
      existingProduct.quantity = calculateQuantity(
        existingProduct.quantity,
        quantity
      );
    } else {
      // Add new product to cart
      cart.products.push({ product_id, quantity });
    }

    // Calculate the total amount in the cart
    let totalAmount = 0;
    for (const product of cart.products) {
      const productDoc = await Product.findById(product.product_id);
      if (productDoc) {
        const productPrice = Number(productDoc.price);
        const productQuantity = parseInt(product.quantity);
        totalAmount += productPrice * productQuantity;
      }
    }
    cart.totalAmount = totalAmount;

    await cart.save();

    res.status(200).json({
      msg: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};




exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user_id: req.params.id });

    // Find the index of the product in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.product_id== productId
    );

    if (productIndex !== -1) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
      await cart.save();

      res.status(200).json({
        msg: "Product removed from cart successfully",
        data: cart,
      });
    } else {
      res.status(404).json({
        error: "Product not found in cart",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};



exports.updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const { quantity } = req.body;

    const existingProduct = cart.products.find(
      (product) => product.product_id== productId
    );

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    existingProduct.quantity = Math.max(1, quantity);

    // Calculate the total amount
    let totalAmount = 0;
    for (const product of cart.products) {
      const productDoc = await Product.findById(product.product_id);
      if (productDoc) {
        totalAmount += productDoc.price * product.quantity;
      }
    }
    cart.totalAmount = totalAmount;

    const updatedCart = await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
