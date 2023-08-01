const { Schema, model } = require ('mongoose');

const BrandSchema = new Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
 
  },
  Description: {
    type: String,
    required: true,
  },
  LogoUrl: {
    type: String,
    required: true,
  },
 
});

const Brand = model('Brand', BrandSchema);
module.exports = Brand;
