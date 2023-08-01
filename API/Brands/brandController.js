const Brand = require('./BrandModel');
const { connect } = require('mongoose');
require('dotenv').config();

const createBrand = async (req, res) => {
  const { Name, Description, LogoUrl } = req.body;

  if (!Name || !Description || !LogoUrl) {
    res.status(400).json({
      message: "Missing Required Field",
    });
  } else {
    try {
      await connect(process.env.MONGO_URI);
      console.log("DB Connected");
      const checkExisting = await Brand.exists({ Name });

      if (checkExisting) {
        res.status(400).json({
          message: "Brand Already Exists",
        });
      } else {
        await Brand.create({ Name, Description, LogoUrl });
        const allBrands = await Brand.find();

        res.status(201).json({
          message: "Brand Created Successfully",
          brands: allBrands,
        });
      }
    } catch (error) {
      console.error("Error during Brand creation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const getBrandByName = async (req, res) => {
  const { name } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const brand = await Brand.findOne({ Name: name });
    res.json({ brand });
  } catch (error) {
    console.error("Error fetching brand by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBrandByID = async (req, res) => {
  const { _id } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    const brand = await Brand.findById(_id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ brand });
  } catch (error) {
    console.error("Error fetching Brand by ID:", error);
    res.status(500).json({ message: "Internal server error" });
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
    console.error("Error updating brand:", error);
    res.status(500).json({ message: "Internal server error" });
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
    console.error("Error deleting brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBrand,
  getBrandByName,
  getBrandByID,
  updateBrand,
  deleteBrand,
};
