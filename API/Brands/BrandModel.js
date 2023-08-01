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
    required: false, // We can set this to true if Description is required
  },
  LogoUrl: {
    type: String,
    required: true, // We can set this to false if LogoUrl is not required
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Brand = model('Brand', BrandSchema);
module.exports = Brand;
