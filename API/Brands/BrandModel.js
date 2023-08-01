const { Schema, model } = require('mongoose');

const BrandSchema = new Schema({
  brandname: {
    type: String,
    unique: true,
    required: true,
 
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Brand = model('Brand', BrandSchema);
module.exports = Brand;
