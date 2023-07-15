const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensures only one cart per user
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, 
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
  },
  {
 
  }
);



const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
