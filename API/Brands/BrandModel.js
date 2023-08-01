// BrandModel.js
const { Schema, model } = require('mongoose');

const BrandSchema = new Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  Description: {
    type: String,
    required: true,
  },
  LogoUrl: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Brand = model('Brand', BrandSchema);
module.exports = Brand;
