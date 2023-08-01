const Product = require("./ProductModel");
const { connect } = require("mongoose");
require("dotenv").config();

// here we are going to create Products
const createProduct = async (req, res) => {
  const { name, price, category, brand, thumbnail, imageArray, description } =
    req.body;

  try {
    await connect(process.env.MONGO_URI);
    const newProduct = await Product.create({
      name,
      price,
      category,
      brand,
      thumbnail,
      imageArray,
      description,
    });
    res.status(201).json({ product: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//here we get products by brands
const getProductsByBrand = async (req, res) => {
  const { brand } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const products = await Product.find({ brand });
    res.json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, category, brand, thumbnail, imageArray, description } =
    req.body;

  try {
    await connect(process.env.MONGO_URI);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, category, brand, thumbnail, imageArray, description },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await connect(process.env.MONGO_URI);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProductsByBrand,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
