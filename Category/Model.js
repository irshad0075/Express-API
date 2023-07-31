const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    unique: true,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
});

const Category = model('Category', CategorySchema);
module.exports = Category;
