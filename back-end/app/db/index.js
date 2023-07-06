const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductsData = require("./data/products.json");

require("dotenv").config();
const { MONGO_DEV_URL } = process.env;
mongoose
  .connect(MONGO_DEV_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    console.log(`Connected to database ${x.connections[0].name}`);
    await Product.insertMany(ProductsData);

    console.log("Database Seed Finished");
    mongoose.connection.close();
    console.log("Disconnected from db ****");
    process.exit(0);
  });
