const { connect } = require("mongoose");
require("dotenv").config();
const Category = require("./Model.js");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.json(allCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { categoryName, categoryImage } = req.body;
  try {
    const checkExisting = await Category.exists({ categoryName });
    if (checkExisting) {
      return res.status(400).json({ message: "Category already exists." });
    }
    const newCategory = await Category.create({ categoryName, categoryImage });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName, categoryImage } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName, categoryImage },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
