const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      msg:"getting all products",
      data:products
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({
        msg:"getting all products",
        data:product
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
      console.error(error); // Add this line to log the error
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, imageUrl, category } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
      imageUrl,
      category
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      msg: "Product created successfully",
      data: savedProduct
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description } = req.body;    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        description
      },
      { new: true }
    ); 
    if (updatedProduct) {
      res.status(200).json({
        msg:"product updated successfully",
        data:updateProduct
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (deletedProduct) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getProductsByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const products = await Product.find({ category });
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.createManyProducts = async (req, res) => {
    try {
      const products = req.body;
      const createdProducts = await Product.insertMany(products);
  
      res.status(201).json({
        message: "Products created successfully",
        data: createdProducts,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
