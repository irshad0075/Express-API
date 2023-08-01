const Brand = require('./BrandModel');
const { connect } = require('mongoose');
require('dotenv').config();

const createBrand = async (req, res) => {
  const { Name, Description, LogoUrl } = req.body;
  console.log('Creating brand:', Name, Description, LogoUrl);


  if (!Name || !Description || !LogoUrl) {
    return res.status(400).json({
      message: "Missing Required Field",
    });
  }

  try {
    await connect(process.env.MONGO_URI);
    console.log("DB Connected");
    const checkExisting = await Brand.exists({ Name });

    if (checkExisting) {
      return res.status(400).json({
        message: "Brand Already Exists",
      });
    }

    await Brand.create({ Name, Description, LogoUrl });
    const allBrands = await Brand.find();

    res.status(201).json({
      message: "Brand Created Successfully",
      brands: allBrands,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getBrandByName = async (req, res) => {
  const { name } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const brand = await Brand.findOne({ Name: name });
    res.json({ brand });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getBrandByID = async (req, res) => {
  const { _id } = req.params; // Assuming you will pass _id as a URL parameter

  try {
    await connect(process.env.MONGO_URI);
    const brand = await Brand.findById(_id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ brand });
  } catch (error) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const updateBrand = async (req, res) => {
  const { _id, Name, Description, LogoUrl } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    const updatedBrand = await Brand.findByIdAndUpdate(
      _id,
      { Name, Description, LogoUrl },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ brand: updatedBrand });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  const { _id } = req.params;

  try {
    await connect(process.env.MONGO_URI);
    const deletedBrand = await Brand.findByIdAndDelete(_id);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const brands = await Brand.find();
    res.json({
      message: "Brand Deleted Successfully",
      brands,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBrand,
  getBrandByName,
  getBrandByID,
  updateBrand,
  deleteBrand,
};
